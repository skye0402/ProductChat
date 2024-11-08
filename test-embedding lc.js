import dotenv from 'dotenv';
import { AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/langchain';
dotenv.config({ path: '.env.local' });

async function getEmbedding() {
  try {
    const modelName = 'text-embedding-3-small';
    console.log('Model Name:', modelName);

    const embeddingClient = new AzureOpenAiEmbeddingClient({
        modelName: modelName,
        resourceGroup: 'generative-ai',
        maxRetries: 0
    });

    const input = 'AI is fascinating';
    console.log('Input:', input);

    const embeddedDocuments = await embeddingClient.embedDocuments([
      'Page 1: Paris is the capital of France.',
      'Page 2: It is a beautiful city.'
    ]);

    // const embedding = response.getEmbedding();
    console.log('Embedding:', embeddedDocuments);
  } catch (error) {
    console.error('Error fetching embedding:', error);
    console.error('Error Details:', error.message);
  }
}

getEmbedding();