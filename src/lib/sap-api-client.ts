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
      // First API call to get basic product info
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
      
      // Transform and fetch sales text for each product
      const products = await Promise.all(data.d.results.map(async (product: any) => {
        // Find English description, fallback to first available description
        const englishDesc = product.to_Description.results.find(
          (desc: any) => desc.Language === 'EN'
        );
        const defaultDesc = product.to_Description.results[0];

        // Fetch sales text for this product
        const salesTextResponse = await fetch(
          `${this.baseUrl}/A_ProductSalesDelivery(Product='${product.Product}',ProductSalesOrg='1710',ProductDistributionChnl='10')?$expand=to_SalesText`,
          {
            headers: {
              Authorization: `Basic ${this.auth}`,
              Accept: 'application/json'
            }
          }
        );

        let salesText = '';
        if (salesTextResponse.ok) {
          const salesData = await salesTextResponse.json();
          // Find English sales text, fallback to first available
          const englishSalesText = salesData.d.to_SalesText?.results?.find(
            (text: any) => text.Language === 'EN'
          );
          const defaultSalesText = salesData.d.to_SalesText?.results?.[0];
          salesText = englishSalesText?.LongText || defaultSalesText?.LongText || '';
        }
        
        return {
          id: product.Product,
          description: englishDesc?.ProductDescription || defaultDesc?.ProductDescription || '',
          ean: product.ProductStandardID || '',
          weight: {
            value: parseFloat(product.GrossWeight) || 0,
            unit: product.WeightUnit
          },
          volume: {
            value: parseFloat(product.MaterialVolume) || 0,
            unit: product.VolumeUnit
          },
          baseUnit: product.BaseUnit,
          salesText: salesText
        };
      }));

      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
} 