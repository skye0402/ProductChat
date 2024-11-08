import dotenv from 'dotenv';
import { AzureOpenAiChatClient } from '@sap-ai-sdk/foundation-models';

// Configure dotenv
dotenv.config({ path: '.env.local' });

const logger = { info: (msg) => console.log(msg) };

const chatClient = new AzureOpenAiChatClient('gpt-4o');
const response = await chatClient.run({
  messages: [
    {
      role: 'user',
      content: 'Where is the deepest place on earth located'
    }
  ]
});

const responseContent = response.getContent();
logger.info(`Answer: ${responseContent}`);