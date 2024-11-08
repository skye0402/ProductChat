declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SAP_API_URL: string;
      SAP_API_USER: string;
      SAP_API_PASSWORD: string;
      SAP_AI_HUB_URL: string;
      SAP_AI_HUB_TOKEN_URL: string;
      SAP_AI_HUB_CLIENT_ID: string;
      SAP_AI_HUB_CLIENT_SECRET: string;
      SAP_AI_HUB_RESOURCE_GROUP: string;
      HANA_HOST: string;
      HANA_PORT: string;
      HANA_UID: string;
      HANA_PWD: string;
    }
  }
}

export {}; 