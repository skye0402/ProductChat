export class SapApiClient {
  private baseUrl: string;
  private attachmentUrl: string;
  private auth: string;

  constructor() {
    this.baseUrl = process.env.SAP_PRODUCT_API_URL!;
    this.attachmentUrl = process.env.SAP_ATTACHMENT_API_URL!;
    this.auth = Buffer.from(
      `${process.env.SAP_API_USER}:${process.env.SAP_API_PASSWORD}`
    ).toString('base64');
  }

  async searchProducts(matchcode: string) {
    try {
      // First API call to get basic product info
      const response = await fetch(
        `${this.baseUrl}/A_Product?$filter=startswith(Product, '${matchcode}') and IsMarkedForDeletion eq false&$expand=to_Description,to_ProductBasicText`,
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
          `${this.baseUrl}/A_ProductSalesDelivery(Product='${product.Product}',ProductSalesOrg='1710',ProductDistributionChnl='10')?$filter=IsMarkedForDeletion eq false&$expand=to_SalesText`,
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

  async getProductImage(productId: string) {
    try {
      // First get all attachments to find the image
      const response = await fetch(
        `${this.attachmentUrl}/GetAllOriginals?BusinessObjectTypeName='MARA'&LinkedSAPObjectKey='${productId}'&SAPObjectType='Product'`,
        {
          headers: {
            Authorization: `Basic ${this.auth}`,
            Accept: 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get attachments: ${response.statusText}`);
      }

      const data = await response.json();
      const image = data.d.results.find((attachment: any) => 
        attachment.MimeType.startsWith('image/')
      );

      if (!image) {
        return null;
      }

      // Download the image content
      const imageResponse = await fetch(
        `${this.attachmentUrl}/AttachmentContentSet(DocumentInfoRecordDocType='${image.DocumentInfoRecordDocType}',DocumentInfoRecordDocNumber='${image.DocumentInfoRecordDocNumber}',DocumentInfoRecordDocPart='${image.DocumentInfoRecordDocPart}',DocumentInfoRecordDocVersion='${image.DocumentInfoRecordDocVersion}',LogicalDocument='${image.LogicalDocument}',ArchiveDocumentID='${image.ArchiveDocumentID}',LinkedSAPObjectKey='${image.LinkedSAPObjectKey}',BusinessObjectTypeName='${image.BusinessObjectTypeName}')/$value`,
        {
          headers: {
            Authorization: `Basic ${this.auth}`
          }
        }
      );

      if (!imageResponse.ok) {
        throw new Error(`Failed to download image: ${imageResponse.statusText}`);
      }

      // Convert image to base64
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      return {
        base64: base64Image,
        mimeType: image.MimeType
      };
    } catch (error) {
      console.error(`Error fetching image for product ${productId}:`, error);
      return null;
    }
  }
} 