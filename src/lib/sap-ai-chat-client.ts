import { initializeEnvironment } from './init';
import { AzureOpenAiChatClient } from '@sap-ai-sdk/langchain';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { HanaDB } from "@langchain/community/vectorstores/hanavector";

interface ProductMetadata {
  id: string;
  type: string;
  baseUnit: string;
  image: {
    data: string;
    mimeType: string;
  } | null;
}

export class SapAiChatClient {
  private chatClient: AzureOpenAiChatClient;
  private chain: any;
  private vectorStore: HanaDB;

  constructor(vectorStore: HanaDB) {
    initializeEnvironment();
    
    this.chatClient = new AzureOpenAiChatClient({
      modelName: 'gpt-4o',
      resourceGroup: process.env.SAP_AI_HUB_RESOURCE_GROUP,
      maxRetries: 3
    });

    this.vectorStore = vectorStore;
  }

  async initialize() {
    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a knowledgeable product expert. Analyze the provided context and structure your response in this format:

## Product Overview

For each relevant product:
- Product ID: [ID]
  Product name and detailed analysis including benefits, use cases, and unique selling points
  ![Product Image](product:[ID])

## Recommendation
Provide a personalized recommendation based on the user's query, comparing relevant products and explaining the rationale.
Include the product image reference ![Product Image](product:[ID]) for the recommended product.

Use markdown for formatting. Only include products and their images that are relevant to the user's query. If the user query is not about products, politely decline to answer.

Context:
{context}`
      ],
      ["human", "{input}"]
    ]);
    const combineDocsChain = await createStuffDocumentsChain({
      llm: this.chatClient,
      prompt: questionAnsweringPrompt,
    });

    this.chain = await createRetrievalChain({
      retriever: this.vectorStore.asRetriever({ k: 5 }),
      combineDocsChain,
    });
  }

  async chat(message: string) {
    try {
      const response = await this.chain.invoke({
        input: message,
      });
      
      let answer = response.answer;
      
      const productMetadata = response.context?.map((doc: any) => doc.metadata as ProductMetadata) || [];
      
      productMetadata.forEach((product: ProductMetadata) => {
        if (product.image) {
          const placeholders = [
            `![Product Image](product:${product.id})`,
            `![Product ${product.id}](product:${product.id})`
          ];
          
          const imageMarkdown = `![Product ${product.id}](data:${product.image.mimeType};base64,${product.image.data})`;
          
          placeholders.forEach(placeholder => {
            answer = answer.replace(new RegExp(escapeRegExp(placeholder), 'g'), imageMarkdown);
          });
        }
      });
      
      return answer;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} 