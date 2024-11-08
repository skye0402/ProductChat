export class SapApiClient {
  private baseUrl: string;
  private auth: string;

  constructor() {
    this.baseUrl = process.env.SAP_API_URL!;
    this.auth = Buffer.from(
      `${process.env.SAP_API_USER}:${process.env.SAP_API_PASSWORD}`
    ).toString('base64');
  }

  async searchProducts(matchcode: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/A_Product?$filter=startswith(Product, '${matchcode}')&$expand=to_Description,to_ProductBasicText`,
        {
          headers: {
            Authorization: `Basic ${this.auth}`,
            Accept: 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.d.results;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
} 