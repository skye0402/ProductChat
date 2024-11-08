import dotenv from 'dotenv';
import { AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/foundation-models';
dotenv.config({ path: '.env.local' });

async function getEmbedding() {
  try {
    const modelName = 'text-embedding-3-small';
    console.log('Model Name:', modelName);

    const embeddingClient = new AzureOpenAiEmbeddingClient({
        modelName: modelName,
        resourceGroup: 'generative-ai'
    });
    embeddingClient.em
    const input = 'AI is fascinating';
    console.log('Input:', input);

    const response = await embeddingClient.run({
      input: input
    });

    const embedding = response.getEmbedding();
    console.log('Embedding:', embedding);
  } catch (error) {
    console.error('Error fetching embedding:', error);
    console.error('Error Details:', error.message);
  }
}

getEmbedding();