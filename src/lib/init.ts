import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
export function initializeEnvironment() {
  dotenv.config({
    path: path.resolve(process.cwd(), '.env.local')
  });

  // Verify required environment variables
  const requiredEnvVars = [
    'HANA_HOST',
    'HANA_PORT',
    'HANA_UID',
    'HANA_PWD',
    'AICORE_SERVICE_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
} 