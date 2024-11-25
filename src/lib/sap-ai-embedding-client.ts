import { initializeEnvironment } from './init';
import { AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/langchain';
import { Document } from '@langchain/core/documents';
import hanaClient from "hdb";
import {
    HanaDB,
    HanaDBArgs,
  } from "@langchain/community/vectorstores/hanavector";
import { SapApiClient } from './sap-api-client';

export class SapAiEmbeddingClient {
  private embeddings: AzureOpenAiEmbeddingClient;
  private vectorStore: HanaDB;
  private args: HanaDBArgs;
  private hanaConnection: any;

  constructor() {
    // Ensure environment variables are loaded
    initializeEnvironment();

    // Initialize embedding client with proper SAP AI Hub credentials
    this.embeddings = new AzureOpenAiEmbeddingClient({
      modelName: 'text-embedding-3-small',
      resourceGroup: process.env.SAP_AI_HUB_RESOURCE_GROUP,
      maxRetries: 0
    });

    // Initialize HANA connection using createClient
    this.hanaConnection = hanaClient.createClient({
      host: process.env.HANA_HOST,
      port: parseInt(process.env.HANA_PORT),
      user: process.env.HANA_UID,
      password: process.env.HANA_PWD,
    });

    this.args = {
        connection: this.hanaConnection,
        tableName: "PRODUCT_VECTORS",
        distanceStrategy: 'cosine' // explicitly set the distance strategy
    };
    // Initialize vector store with proper configuration
    this.vectorStore = new HanaDB(this.embeddings, this.args);
  }

  async initialize() {
    // Connect to HANA
    await new Promise<void>((resolve, reject) => {
      this.hanaConnection.connect((err: Error) => {
        if (err) {
          reject(err);
        } else {
          console.log("Connected to SAP HANA successfully.");
          resolve();
        }
      });
    });
    // Initialize vector store
    await this.vectorStore.initialize();
  }

  async clearVectorStore() {
    await this.vectorStore.delete({ filter: {} });
  }

  async embedProducts(products: any[]) {
    const sapClient = new SapApiClient();
    
    // Fetch images for all products in parallel
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const image = await sapClient.getProductImage(product.id);
        return {
          ...product,
          image
        };
      })
    );

    const docs = productsWithImages.map(product => new Document({
      pageContent: `Product ID: ${product.id}\n\n` +
                   `${product.description}\n\n` +
                   `Sales Text: ${product.salesText}\n\n` +
                   `Physical Properties:\n` +
                   `- Volume: ${product.volume.value} ${product.volume.unit}\n` +
                   `- Weight: ${product.weight.value} ${product.weight.unit}\n` +
                   `- Base Unit of Measure: ${product.baseUnit}\n` +
                   `- EAN: ${product.ean}`,
      metadata: {
        id: product.id,
        type: 'product',
        baseUnit: product.baseUnit,
        image: product.image ? {
          data: product.image.base64,
          mimeType: product.image.mimeType
        } : null
      }
    }));

    // First clear the vector store
    await this.clearVectorStore();
    // Add the documents to the vector store
    await this.vectorStore.addDocuments(docs);
  }

  async disconnect() {
    this.hanaConnection.disconnect();
  }

  async searchProducts(query: string) {
    // Implement your product search logic here
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    return response.json();
  }

  getVectorStore() {
    return this.vectorStore;
  }
} 