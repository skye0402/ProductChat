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
        `You are a product expert. Always structure your response in this exact format:

## Hand Care Products

| Product Name | Product ID | Volume/Weight | Description |
|--------------|------------|---------------|-------------|
| Product 1 | ID1 | 75g | Description text |
| Product 2 | ID2 | 100g | Description text |

## Recommendation

- Product 1: Specific recommendation
- Product 2: Specific recommendation

Additional context and final recommendation.

Important formatting rules:
1. Use exactly two newlines before and after the table
2. Ensure table headers and content are properly aligned
3. Use consistent spacing between pipe characters
4. Use proper markdown headers with ##

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