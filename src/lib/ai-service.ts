import { SapAiEmbeddingClient } from './sap-ai-embedding-client';
import { SapAiChatClient } from './sap-ai-chat-client';

class AiService {
  private static instance: AiService;
  private embeddingClient: SapAiEmbeddingClient | null = null;
  private chatClient: SapAiChatClient | null = null;
  private initialized = false;

  private constructor() {}

  public static getInstance(): AiService {
    if (!AiService.instance) {
      AiService.instance = new AiService();
    }
    return AiService.instance;
  }

  public async initialize() {
    if (this.initialized) return;

    try {
      this.embeddingClient = new SapAiEmbeddingClient();
      await this.embeddingClient.initialize();

      this.chatClient = new SapAiChatClient(this.embeddingClient.getVectorStore());
      await this.chatClient.initialize();

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      throw error;
    }
  }

  public async chat(message: string) {
    if (!this.chatClient) {
      throw new Error('Chat client not initialized');
    }
    return await this.chatClient.chat(message);
  }

  public async cleanup() {
    if (this.embeddingClient) {
      await this.embeddingClient.disconnect();
    }
    this.initialized = false;
  }
}

export const aiService = AiService.getInstance(); 