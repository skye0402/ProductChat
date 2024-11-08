import { initializeEnvironment } from './init';
import { AzureOpenAiChatClient } from '@sap-ai-sdk/langchain';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { HanaDB } from "@langchain/community/vectorstores/hanavector";

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
        "You are a product expert. Use the following product information to answer the question. If you don't know the answer, say you don't know. Don't make up information.\n\nContext:\n{context}"
      ],
      ["human", "{input}"]
    ]);
    const combineDocsChain = await createStuffDocumentsChain({
      llm: this.chatClient,
      prompt: questionAnsweringPrompt,
    });

    this.chain = await createRetrievalChain({
      retriever: this.vectorStore.asRetriever({ k: 3 }),
      combineDocsChain,
    });
  }

  async chat(message: string) {
    try {
      const response = await this.chain.invoke({
        input: message,
      });
      return response.answer;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
} 