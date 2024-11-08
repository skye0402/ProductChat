import { initializeEnvironment } from '@/lib/init';
import { SapAiClient } from '@/lib/sap-ai-client';
import { SapApiClient } from '@/lib/sap-api-client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Initialize environment at the start of the API route
//   initializeEnvironment();

  const { action, matchcode } = await request.json();
  let aiClient: SapAiClient | null = null;

  try {
    if (action === 'clear') {
      aiClient = new SapAiClient();
      await aiClient.initialize();
      await aiClient.clearVectorStore();
      return NextResponse.json({ message: 'Vector store cleared successfully' });
    }

    if (action === 'load' && matchcode) {
      const apiClient = new SapApiClient();
      aiClient = new SapAiClient();
      await aiClient.initialize();

      const products = await apiClient.searchProducts(matchcode);
      await aiClient.embedProducts(products);

      return NextResponse.json({ 
        message: `Successfully loaded ${products.length} products` 
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' }, 
      { status: 400 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  } finally {
    if (aiClient) {
      await aiClient.disconnect();
    }
  }
} 