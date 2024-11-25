# Product Master Chat Application

A Next.js-based chat application that provides an AI-powered interface for querying product information from SAP S/4HANA Cloud using the Product Master API. The application leverages SAP's Generative AI Hub and HANA Vector Store for intelligent product search and recommendations.
![Product Master Chat S/4HANA](https://github.com/user-attachments/assets/86682e35-58dc-46b8-84f8-81a61ebee890)

## Features

- **Interactive Chat Interface**: Natural language interaction with product data
- **RAG-based Search**: Retrieval-Augmented Generation for accurate product information
- **Product Image Support**: Display of product images in chat responses
- **Vector Store Management**: Tools to manage and update the HANA Vector Store
- **Mobile-First Design**: Responsive interface built with Tailwind CSS

## Architecture

The application consists of several key components:

### Frontend
- Next.js 14+ with App Router
- Tailwind CSS for styling
- MDX for rich text rendering

### Backend Integration
- SAP S/4HANA Cloud Product Master API (A2X)
- SAP Generative AI Hub with GPT-4o
- SAP HANA Vector Store for embeddings

## Prerequisites

- Node.js 18.17 or later
- SAP S/4HANA Cloud instance with Product Master API access
- SAP AI Hub access with GPT-4 model
- SAP HANA Cloud instance
- Access credentials for all SAP services

## Setup

1. Clone the repository:
```bash
git clone https://github.com/skye0402/ProductChat.git
cd product-master-chat
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# SAP S/4HANA Cloud API
SAP_PRODUCT_API_URL=https://your-product-api-url
SAP_ATTACHMENT_API_URL=https://your-attachment-api-url
SAP_API_USER=your_username
SAP_API_PASSWORD=your_password

# SAP Generative AI Hub
AICORE_SERVICE_KEY={"clientid":"your_client_id","clientsecret":"your_client_secret","url":"your_url","identityzone":"your_identityzone","identityzoneid":"your_identityzoneid","appname":"your_appname","serviceurls":{"AI_API_URL":"your_ai_api_url"}}

# SAP HANA Vector Store
HANA_HOST=your_hana_host
HANA_PORT=30015
HANA_UID=your_hana_user
HANA_PWD=your_hana_password
```

4. Run the development server:
```bash
npm run dev
```

## Usage

### Initial Setup
1. Navigate to the Settings page
2. Click "Clear HANA VS" to initialize the vector store
3. Enter a product matchcode (e.g., "APJ*")
4. Click "Initial Load" to populate the vector store with product data

### Chat Interface
1. Navigate to the Product Chat page
2. Enter questions about products in natural language
3. View AI-generated responses with product details and images

## Key Components

### SAP AI Embedding Client (`sap-ai-embedding-client.ts`)
Handles:
- Vector store management
- Product data embedding
- Integration with HANA Vector Store
- Product image processing

### SAP AI Chat Client (`sap-ai-chat-client.ts`)
Manages:
- Chat interactions
- RAG-based product search
- Response generation with GPT-4
- Image integration in responses

### SAP API Client (`sap-api-client.ts`)
Handles:
- Product Master API integration
- Product data retrieval
- Image attachment fetching
- Authentication

## Development

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Security Considerations

- All credentials are stored in environment variables
- API authentication uses Basic Auth
- HTTPS is required for production deployment
- Vector store access is controlled via HANA authentication

## Limitations

- External number ranges only
- Maximum of 5000 products per query
- Image support depends on attachment availability
- Rate limits apply to AI model usage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

For support, please contact [your contact information] 
