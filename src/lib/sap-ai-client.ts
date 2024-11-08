import { initializeEnvironment } from './init';
import { AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/langchain';
import { Document } from '@langchain/core/documents';
import hanaClient from "hdb";
import {
    HanaDB,
    HanaDBArgs,
  } from "@langchain/community/vectorstores/hanavector";

export class SapAiClient {
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
    const docs = products.map(product => new Document({
      pageContent: `${product.Product}: ${product.to_Description?.ProductDescription || ''}\n${product.to_ProductBasicText?.ProductLongText || ''}`,
      metadata: {
        id: product.Product,
        type: product.ProductType,
        industry: product.IndustryStandardName
      }
    }));

    // First clear the vector store
    await this.clearVectorStore();
    console.log(process.env.AICORE_SERVICE_KEY);
    // Get embeddings for each document's content
    const texts = docs.map(doc => doc.pageContent);

    // Ensure the environment variable is defined
    const serviceKey = process.env['AICORE_SERVICE_KEY'] || '{}';
    const credentials = JSON.parse(serviceKey);
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    
    try {
      const embeddings = await this.embeddings.embedDocuments(texts);
    } catch (error: any) {
        const cause = error.cause
        console.error("An error occurred:", cause);
    }
    console.log('Embeddings:', this.embeddings);


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
} 