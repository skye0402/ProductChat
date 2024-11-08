import { aiService } from '@/lib/ai-service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    await aiService.initialize(); // Will only initialize once
    const response = await aiService.chat(message);
    return NextResponse.json({ answer: response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 