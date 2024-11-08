# SAP Product Master API Documentation

## Product Master (A2X)

### Use
**Technical name:** `API_PRODUCT_SRV`

This synchronous inbound service enables you to create, read, update, and delete (CRUD operations) the master data for products by exposing the remote API views through OData.

**Note:** SAP recommends that you use Product Master (A2X) API for the following entities:
- Sales Text
- Basic Text
- Purchase Text
- Plant Text

For all other entities, use Product (Version 2) API. For more information about the new version of the Product API, see Product (Version 2).

This service is published on the SAP Business Accelerator Hub. For more information about APIs, see APIs on SAP Business Accelerator Hub.

### OData Operations and URLs

| Operation | Sample URLs | Links |
|-----------|--------------|-------|
| GET (to read product master data) | `/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product(Product='TG-17')` | Read Product Master Data |
| POST (to create product master data) | `/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product` | Create Product Master Data |
| PATCH, PUT (to update product master data) | `/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product(Product='TG-17')` | Update (Patch) Product Master Data |
| DELETE (to delete product master data) | `/sap/opu/odata/SAP/API_PRODUCT_SRV/A_ProductDescription(Product='TG-17', Language='EN')` | Delete Product Master Data |
| BATCH (to update multiple product master data records) | `/sap/opu/odata/sap/API_PRODUCT_SRV/$batch` | Batch Request |

You can create, read, update, and delete product master data at the entity level. Note that you can delete master data for product only at the following entities:
- Product Description
- Sales Tax
- Units of Measure
- Units of Measure EAN
- Basic Text
- Inspection Text
- Purchase Text
- Plant Text
- Sales Text

### Extensibility
You can extend the following entities for product master data using the app Custom Fields and Logic (available on SAP Fiori Launchpad) to add custom fields as per requirements:
- A_Product
- A_ProductPlant
- A_ProductSalesDelivery
- A_ProductStorageLocation
- A_ProductUnitsOfMeasure

### Service Structure
All information from this OData service is utilized when processing data, including appropriate checks for restricted values and authorizations. If any issues arise during an operation, the system displays error messages in the response. This service is built using the CDS views based on product master data tables via gateway service builder and SADL.

### Entities
The following table provides information on the supported operations at each entity level:

| Entities | Descriptions | Link to details | Supported Operations |
|----------|--------------|-----------------|----------------------|
| A_Product | Product | Product | Create, Read, Update |
| A_ProductDescription | Product Description | Product Description | Create, Read, Update, Delete |
| A_ProductPlant | Plant | Plant Data | Create, Read, Update |
| A_ProductSalesDelivery | Sales Delivery | Sales Organization Data | Create, Read, Update |
| A_ProductStorageLocation | Storage Location | Storage Location Data | Create, Read, Update |
| A_ProductSalesTax | Sales Tax | Sales Tax Data | Create, Read, Update, Delete |
| A_ProductPlantProcurement | Plant Procurement | Procurement Data | Create, Read, Update |
| A_ProductWorkScheduling | Work Scheduling | Work Scheduling Data | Create, Read, Update |
| A_ProductSupplyPlanning | Supply Planning | Supply Planning Data | Create, Read, Update |
| A_ProductSales | Product Sales | Basic Sales Data | Create, Read, Update |
| A_ProductSalesText | Product Sales Text | Sales Text | Create, Read, Update, Delete |
| A_ProductBasicText | Product Basic Text | Basic Text | Create, Read, Update, Delete |
| A_ProductInspectionText | Product Inspection Text | Inspection Text | Create, Read, Update, Delete |
| A_ProductPlantCosting | Product Plant Costing | Costing Data at Plant Level | Create, Read, Update |
| A_ProductPlantForecasting | Product Plant Forecasting | Forecasting Data | Create, Read, Update |
| A_ProductPlantIntlTrade | Product Plant International Trade | International Trade Data | Create, Read, Update |
| A_ProductPlantQualityMgmt | Product Plant Quality Management | Quality Management Data | Create, Read, Update |
| A_ProductQualityMgmt | Product Quality Management | Basic Quality Management Data | Create, Read, Update |
| A_ProductProcurement | Product Procurement | Basic Procurement Data | Create, Read, Update |
| A_ProductStorage | Product Storage | Basic Storage Data | Create, Read, Update |
| A_ProductPurchaseText | Product Purchase Text | Purchase Text | Create, Read, Update, Delete |
| A_ProductPlantText | Product Plant Text | Plant Text | Create, Read, Update, Delete |
| A_ProductPlantStorage | Product Plant Storage | Storage Data at Plant Level | Create, Read, Update |
| A_ProductPlantSales | Product Plant Sales | Sales Data at Plant Level | Create, Read, Update |
| A_ProductPlantMRPArea | Product Plant MRP Area | MRP Area Data | Create, Read, Update |
| A_ProductUnitsOfMeasure | Product Unit of Measure | Units of Measure | Create, Read, Update, Delete |
| A_ProductUnitsOfMeasureEAN | Product Units Of Measure EAN | GTIN Data | Create, Read, Update, Delete |
| A_ProductMLAccount | Product Material Ledger Account | Material Ledger Account | Read, Update |
| A_ProductMLPrices | Product Material Ledger Prices | Material Ledger Prices | Read, Update |
| A_ProductValuation | Product Valuation | Valuation Area Data | Create, Read, Update |
| A_ProductValuationAccount | Product Valuation Account | Valuation Account Data | Read, Update |

### Associations and Cardinality
The table below lists the associations and cardinality for specified entities:

| Source | Target | Navigation Property | Cardinality |
|--------|--------|---------------------|-------------|
| A_Product | A_ProductDescription | to_Description | 1..n |
| A_Product | A_ProductPlant | to_Plant | 0..n |
| A_Product | A_ProductSalesTax | to_ProductSalesTax | 0..n |
| A_Product | A_ProductSalesDelivery | to_SalesDelivery | 0..n |
| A_Product | A_ProductProcurement | to_ProductProcurement | 0..1 |
| A_Product | A_ProductBasicText | to_ProductBasicText | 0..n |
| A_Product | A_ProductInspectionText | to_ProductInspectionText | 0..n |
| A_Product | A_ProductPurchaseText | to_ProductPurchaseText | 0..n |
| A_Product | A_ProductUnitsOfMeasure | to_ProductUnitsOfMeasure | 0..n |
| A_Product | A_ProductStorage | to_ProductStorage | 0..1 |
| A_Product | A_ProductSales | to_ProductSales | 0..1 |
| A_ProductPlant | A_ProductStorageLocation | to_StorageLocation | 0..n |
| A_ProductPlant | A_ProductPlantProcurement | to_ProductPlantProcurement | 0..1 |
| A_ProductPlant | A_ProductWorkScheduling | to_ProductWorkScheduling | 0..1 |
| A_ProductPlant | A_ProductSupplyPlanning | to_ProductSupplyPlanning | 0..1 |
| A_ProductPlant | A_ProductPlantIntlTrd | to_ProdPlantInternationalTrade | 0..1 |
| A_ProductPlant | A_ProductPlantCosting | to_ProductPlantCosting | 0..1 |
| A_ProductPlant | A_ProductPlantForecasting | to_ProductPlantForecast | 0..1 |
| A_ProductPlant | A_ProductPlantQualityMgmt | to_PlantQualityMgmt | 0..1 |
| A_ProductPlant | A_ProductPlantSales | to_PlantSales | 0..1 |
| A_ProductPlant | A_ProductPlantStorage | to_PlantStorage | 0..1 |
| A_ProductPlant | A_ProductPlantText | to_PlantText | 0..1 |
| A_ProductPlant | A_ProductPlantMRPArea | to_PlantMRPArea | 0..n |
| A_ProductSalesDelivery | A_ProductSalesText | to_SalesText | 0..1 |
| A_ProductUnitsOfMeasure | A_ProductUnitsOfMeasureEAN | to_InternationalArticleNumber | 0..1 |

### Service Response

| Description | Code |
|-------------|------|
| OK | 200 |
| Created | 201 |
| Accepted | 202 |
| No Content | 204 |
| Bad Request | 400 |
| Forbidden | 403 |
| Resource Not Found | 404 |
| Internal Server Error | 500 |

### Related Events
- Product Events

### Constraints
When you try to delete master data records using this OData service, note that only the entities that are listed above, get deleted. For the other entries, you should set a flag at the required entity level, such that the data will be marked for archiving. You can set this deletion indicator using the PATCH or PUT operation while updating the product master data record.

For information about how to handle fields that are present in multiple entities during data replication, see Handling Fields Present in Multiple Entities During Replication.

This service does not support parallel ledger functionality.
This service does not support product hierarchies. To maintain product hierarchy, use the migration object or the Manage Product Hierarchies app. Refer to the related links section for more information.
This service does not support the maintenance of retail articles. SAP recommends that you do not use this service to read the data for the same as well.
The following fields are supported only for Read operation:
- ChangeNumber
- MaterialRevisionLevel

The current OData service doesn't allow you to search objects using the long text, as the HANA database doesn't permit to search or filter using the Large Object (LoB) fields.

### Additional Information
The link to the API on the SAP Business Accelerator Hub: [Product Master(A2X) Information](https://api.sap.com/package/SAPProductMasterA2X?section=Artifacts)

**Note:** For more details about Communication Management, see Communication Management.

For security reasons, paging has been enabled for this service. The enablement of this feature is done to avoid the possibility of a Denial of Service (DOS) attack. Currently, the default paging size is set to 100 being the default value (when `$top` is not provided at all) and maximum as 5000 (when `$top` is provided). For more information, refer to [SAP Note 3091132](https://service.sap.com/sap/support/notes/3091132).

This service currently supports only external number ranges.

## Product
**Technical name:** `A_Product`

### Use
This entity contains the fields related to general product master data.

### Parameters

| Parameter | Short Description | Description | Key Field |
|-----------|-------------------|-------------|-----------|
| Product | Product Number | Alphanumeric key uniquely identifying the product. | Yes |
| ProductType | Product Type | Product type defines certain attributes of the product and has important control functions. | No |
| CrossPlantStatus | Cross-Plant Product Status | Indicates whether the product may be used in the following areas for all plants: Materials management, Production planning and control, Plant maintenance and so on. | No |
| CrossPlantStatusValidityDate | Date from which the cross-plant product status is valid | Date from which the cross-plant product status is valid | No |
| CreationDate | Created On | Date on which the record was created | No |
| CreatedByUser | Name of Person Who Created Object | Name of the person who created the record | No |
| LastChangeDate | Date of Last Change | Date on which the record was last changed. | No |
| LastChangedByUser | Name of Person Who Changed Object | Person who changed the object last. | No |
| LastChangeDateTime | Last Changed Date and Time | Specifies the date and time at which the record was last changed | No |
| IsMarkedForDeletion | Flag product for Deletion at Client Level | Indicator that allows you to flag a master record for deletion. | No |
| ProductOldID | Old Product Number | Number under which you have managed the product so far or still manage it, for example, in another system or in a card index. | No |
| GrossWeight | Gross Weight | Gross weight expressed in the unit of weight specified by you in the Unit of weight field. | No |
| PurchaseOrderQuantityUnit | Order unit | Specifies the unit of measure in which the product is ordered. | No |
| SourceOfSupply | Source of Supply | Restricts the search for sources of supply for this product to external (normal) or internal (stock transfer) sources of supply, and also allows you to define a search sequence. | No |
| WeightUnit | Weight Unit | Unit referring to the gross weight or net weight of the product. | No |
| NetWeight | Net Weight | Net weight expressed in the unit of weight specified by you in the Unit of weight field. | No |
| CountryOfOrigin | Country of Origin of Product (Non-Preferential Origin) | The country in which the product has been produced. | No |
| CompetitorID | Competitor | Customer number of the competitor. Competitors are managed in the SAP system as customers of a particular account group. This account group defines internally that the customer is a competitor. | No |
| ProductGroup | Product Group | Key that is used to group together several products or services with the same attributes, and to assign them to a particular product group. | No |
| BaseUnit | Base Unit of Measure | Unit of measure in which stocks of the product are managed | No |
| ItemCategoryGroup | General item category group | Products grouping that helps the system to determine item categories during sales document processing. | No |
| ProductHierarchy | Product Hierarchy | Alphanumeric character string for grouping together product by combining different characteristics. It is used for analyses and price determination. | No |
| Division | Division | A way of grouping materials, products, or services | No |
| VarblPurOrdUnitIsActive | Variable Purchase Order Unit Active | Activation of the variable purchase order unit | No |
| VolumeUnit | Volume Unit | Unit referring to the volume of the product | No |
| MaterialVolume | Volume | Space that the product occupies per unit of volume. The volume refers to the unit specified in the Volume unit field. | No |
| ANPCode | ANP Code | Identifies the products that are controlled by the Brazilian Oil Agency. | No |
| Brand | Brand | Brand to which the product belongs | No |
| ProcurementRule | Procurement rule | Determines the rules on the replenishability of a product for distribution centers and stores. | No |
| ValidityStartDate | Valid-From Date | Date indicating as of when an entry is valid. | No |
| LowLevelcode | Low-Level Code | The lowest level that a product appears in any product structure of the company. | No |
| ProdNoInGenProdInPrepackProd | Product Number of the Generic Product in Prepack Materials | Generic product to which the prepack Product is assigned. | No |
| SerialIdentifierAssgmtProfile | Serial Number Profile | Serial Number Profile | No |
| SizeOrDimensionText | Size/dimensions | Used to record the size or dimensions of the product | No |
| IndustryStandardName | Industry Standard Description (such as ANSI or ISO) | Description of the product in accordance with the appropriate industry standard (such as ANSI or ISO). | No |
| ProductStandardID | The global trade item number (EAN/UPC/GTIN) | A standardized unit that uniquely identifies a product relating to a unit of measure or type of packaging | No |
| InternationalArticleNumberCat | Category of International Article Number (EAN) | Category of International Article Number (EAN) | No |
| ProductIsConfigurable | Configurable Product | Indicator that determines whether the product is configurable. | No |
| IsBatchManagementRequired | Batch management requirement indicator | Specifies whether the product is managed in batches. | No |
| ExternalProductGroup | External Product Group | Key that can be used to assign the product to an external product group or to a product group determined according to external systematics. | No |
| CrossPlantConfigurableProduct | Cross-Plant Configurable Product | Alphanumeric key uniquely identifying the configurable product. | No |
| SerialNoExplicitnessLevel | Level of Explicitness for Serial Number | Level on which the serial number must be unique. | No |
| ProductManufacturerNumber     | Manufacturer Part Number                 | Specifies the number used by the manufacturer to manage a product.          | No        |
| ManufacturerNumber            | Manufacturer Number                      | Specifies the manufacturer of the MPN material.                             | No        |
| ManufacturerPartProfile       | Mfr part profile                         | Defines how you can work with MPN products in the procurement process.      | No        |
| ChangeNumber                  | Change Number                            | Change Number.                                                              | No        |
| MaterialRevisionLevel         | Revision Level                           | Revision Level.                                                             | No        |
| HandlingIndicator             | Handling Indicator                       | Indicator that specifies how products are handled in the warehouse.         | No        |
| WarehouseProductGroup         | Warehouse Product Group                  | Groups products by warehousing points of view.                              | No        |
| WarehouseStorageCondition     | Warehouse Storage Condition              | Describes the storage condition that should be used to store the product.   | No        |
| StandardHandlingUnitType      | Standard HU Type                         | Describes the standard handling unit type for mixed handling units.         | No        |
| SerialNumberProfile           | Serial Number Profile                    | Serial Number Profile.                                                      | No        |
| AdjustmentProfile             | Adjustment Profile                       | Determines how inbound delivery item quantities are to be distributed.      | No        |
| PreferredUnitOfMeasure        | Preferred Alternative UoM for Warehouse Operations | It is the unit used to handle a product in the warehouse.                   | No        |
| IsPilferable                  | Pilferable                               | Indicates that the product is pilferable.                                   | No        |
| IsRelevantForHzdsSubstances   | Relevant for Hazardous Substances        | Indicates that there is hazardous substance data for this product.          | No        |
| QuarantinePeriod              | Quarantine Period                        | Numeric value indicating the period for quarantine.                         | No        |
| TimeUnitForQuarantinePeriod   | Time Unit for Quarantine Period          | Time Unit for Quarantine Period.                                            | No        |
| QualityInspectionGroup        | Quality Inspection Group                 | Quality Inspection Group.                                                   | No        |

# SAP Product Master API Documentation

## Related Events
### Product Events

## Constraints
When you try to delete master data records using this OData service, note that only the entities that are listed above, get deleted. For the other entries, you should set a flag at the required entity level, such that the data will be marked for archiving. You can set this deletion indicator using the PATCH or PUT operation while updating the product master data record.

For information about how to handle fields that are present in multiple entities during data replication, see Handling Fields Present in Multiple Entities During Replication.

This service does not support parallel ledger functionality.
This service does not support product hierarchies. To maintain product hierarchy, use the migration object or the Manage Product Hierarchies app. Refer to the related links section for more information.
This service does not support the maintenance of retail articles. SAP recommends that you do not use this service to read the data for the same as well.
The following fields are supported only for Read operation:
- ChangeNumber
- MaterialRevisionLevel

The current OData service doesn't allow you to search objects using the long text, as the HANA database doesn't permit to search or filter using the Large Object (LoB) fields.

## Additional Information
The link to the API on the SAP Business Accelerator Hub: [Product Master(A2X) Information](https://api.sap.com/package/ProductMasterA2X?section=Overview)

### Note
For more details about Communication Management, see Communication Management.

For security reasons, paging has been enabled for this service. The enablement of this feature is done to avoid the possibility of a Denial of Service (DOS) attack. Currently, the default paging size is set to 100 being the default value (when $top is not provided at all) and maximum as 5000 (when $top is provided). For more information, refer to SAP Note 3091132.

This service currently supports only external number ranges.

## Product
### Technical name: A_Product

### Use
This entity contains the fields related to general product master data.

### Parameters

| Parameter | Short Description | Description | Key Field |
|-----------|-------------------|-------------|-----------|
| Product | Product Number | Alphanumeric key uniquely identifying the product. | Yes |
| ProductType | Product Type | Product type defines certain attributes of the product and has important control functions. | No |
| CrossPlantStatus | Cross-Plant Product Status | Indicates whether the product may be used in the following areas for all plants: Materials management, Production planning and control, Plant maintenance and so on. | No |
| CrossPlantStatusValidityDate | Date from which the cross-plant product status is valid | Date from which the cross-plant product status is valid | No |
| CreationDate | Created On | Date on which the record was created | No |
| CreatedByUser | Name of Person Who Created Object | Name of the person who created the record | No |
| LastChangeDate | Date of Last Change | Date on which the record was last changed. | No |
| LastChangedByUser | Name of Person Who Changed Object | Person who changed the object last. | No |
| LastChangeDateTime | Last Changed Date and Time | Specifies the date and time at which the record was last changed | No |
| IsMarkedForDeletion | Flag product for Deletion at Client Level | Indicator that allows you to flag a master record for deletion. | No |
| ProductOldID | Old Product Number | Number under which you have managed the product so far or still manage it, for example, in another system or in a card index. | No |
| GrossWeight | Gross Weight | Gross weight expressed in the unit of weight specified by you in the Unit of weight field. | No |
| PurchaseOrderQuantityunitUnit | Order unit | Specifies the unit of measure in which the product is ordered. | No |
| SourceOfSupply | Source of Supply | Restricts the search for sources of supply for this product to external (normal) or internal (stock transfer) sources of supply, and also allows you to define a search sequence. | No |
| WeightUnit | Weight Unit | Unit referring to the gross weight or net weight of the product. | No |
| NetWeight | Net Weight | Net weight expressed in the unit of weight specified by you in the Unit of weight field. | No |
| CountryOfOrigin | Country of Origin of Product (Non-Preferential Origin) | The country in which the product has been produced. | No |
| CompetitorID | Competitor | Customer number of the competitor. Competitors are managed in the SAP system as customers of a particular account group. This account group defines internally that the customer is a competitor. | No |
| ProductGroup | Product Group | Key that is used to group together several products or services with the same attributes, and to assign them to a particular product group. | No |
| BaseUnit | Base Unit of Measure | Unit of measure in which stocks of the product are managed | No |
| ItemCategoryGroup | General item category group | Products grouping that helps the system to determine item categories during sales document processing. | No |
| ProductHierarchy | Product Hierarchy | Alphanumeric character string for grouping together product by combining different characteristics. It is used for analyses and price determination. | No |
| Division | Division | A way of grouping materials, products, or services | No |
| VarblPurOrdUnitIsActive | Variable Purchase Order Unit Active | Activation of the variable purchase order unit | No |
| VolumeUnit | Volume Unit | Unit referring to the volume of the product | No |
| MaterialVolume | Volume | Space that the product occupies per unit of volume. The volume refers to the unit specified in the Volume unit field. | No |
| ANPCode | ANP Code | Identifies the products that are controlled by the Brazilian Oil Agency. | No |
| Brand | Brand | Brand to which the product belongs | No |
| ProcurementRule | Procurement rule | Determines the rules on the replenishability of a product for distribution centers and stores. | No |
| ValidityStartDate | Valid-From Date | Date indicating as of when an entry is valid. | No |
| LowLevelcode | Low-Level Code | The lowest level that a product appears in any product structure of the company. | No |
| ProdNoInGenProdInPrepackProd | Product Number of the Generic Product in Prepack Materials | Generic product to which the prepack Product is assigned. | No |
| SerialIdentifierAssgmtProfile | Serial Number Profile | Serial Number Profile | No |
| SizeOrDimensionText | Size/dimensions | Used to record the size or dimensions of the product | No |
| IndustryStandardName | Industry Standard Description (such as ANSI or ISO) | Description of the product in accordance with the appropriate industry standard (such as ANSI or ISO). | No |
| ProductStandardID | The global trade item number (EAN/UPC/GTIN) | A standardized unit that uniquely identifies a product relating to a unit of measure or type of packaging | No |
| InternationalArticleNumberCat | Category of International Article Number (EAN) | Category of International Article Number (EAN) | No |
| ProductIsConfigurable | Configurable Product | Indicator that determines whether the product is configurable. | No |
| IsBatchManagementRequired | Batch management requirement indicator | Specifies whether the product is managed in batches. | No |
| ExternalProductGroup | External Product Group | Key that can be used to assign the product to an external product group or to a product group determined according to external systematics. | No |
| CrossPlantConfigurableProduct | Cross-Plant Configurable Product | Alphanumeric key uniquely identifying the configurable product. | No |
| SerialNoExplicitnessLevel | Level of Explicitness for Serial Number | Level on which the serial number must be unique. | No |
| ProductManufacturerNumber | Manufacturer Part Number | Specifies the number used by the manufacturer, or also by the supplier, to manage a product. | No |
| ManufacturerNumber | Manufacturer Number | Specifies the manufacturer of the MPN material or the manufacturer's plant for which a manufacturer master record has been created. | No |
| ManufacturerPartProfile | Mfr part profile | Defines how you can work with MPN products in the procurement process. | No |
| ChangeNumber | Change Number | Change Number | No |
| MaterialRevisionLevel | Revision Level | Revision Level | No |
| HandlingIndicator | Handling Indicator | Indicator that specifies how products are handled in the warehouse. | No |
| WarehouseProductGroup | Warehouse Product Group | Groups products by warehousing points of view. | No |
| WarehouseStorageCondition | Warehouse Storage Condition | Describes the storage condition that should be used to store the product. | No |
| StandardHandlingUnitType | Standard HU Type | Describes the standard handling unit type for mixed handling units, where no packing instruction is used for creating the HU. | No |
| SerialNumberProfile | Serial Number Profile | Serial Number Profile | No |
| AdjustmentProfile | Adjustment Profile | It determines how inbound delivery item quantities are to be distributed to outbound delivery order item quantities, and which inbound delivery items are relevant for adjustment according to the tolerance. | No |
| PreferredUnitOfMeasure | Preferred Alternative UoM for Warehouse Operations | It is the unit which is used to handle a product in the warehouse. | No |
| IsPilferable | Pilferable | Indicates that the product is pilferable, and possibly requires special storage in a secure storage type/section within the warehouse. | No |
| IsRelevantForHzdsSubstances | Relevant for Hazardous Substances | Indicates that there is hazardous substance data for this product. | No |
| QuarantinePeriod | Quarantine Period | Numeric value indicating the period for quarantine. This value is read along with the unit of measure in the Time Unit for Quarantine Period field | No |
| TimeUnitForQuarantinePeriod | Time Unit for Quarantine Period | Time Unit for Quarantine Period. For example, days, hours, weeks, and so on. | No |
| QualityInspectionGroup | Quality Inspection Group | Quality Inspection Group | No |
| HandlingUnitType | Handling Unit Type | Describes the handling unit type of a packaging product | No |
| HasVariableTareWeight | Variable Tare Weight | Flags all packaging materials for this packaging product type as packaging materials with a variable tare weight | No |
| MaximumPackagingLength | Maximum Packing Length of Packaging Product | Maximum Packing Length of Packaging Product | No |
| MaximumPackagingWidth | Maximum Packing Width of Packaging Product | Maximum Packing Width of Packaging Product | No |
| MaximumPackagingHeight | Maximum Packing Height of Packaging Product | Maximum Packing Height of Packaging Product | No |
| DocumentIsCreatedByCAD | CAD Indicator | This indicator shows that the object (such as BOM or document) was created or changed in a CAD system. Data transfer in the SAP system via CAD interface. | No |

## Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data (supported with deep payload)
- Update (Patch) Product Master Data
- Batch Request

## Product Description
### Technical Name: A_ProductDescription

### Use
This entity contains the fields related to product description.

### Parameters

| Parameter | Short Description | Description | Key Field |
|-----------|-------------------|-------------|-----------|
| Product | Product Number | Alphanumeric key uniquely identifying the product | Yes |
| Language | Language Key | Code identifying the language set for the record. For example, EN for English | Yes |
| ProductDescription | Product Description | Description about the product | No |

## Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data
- Update (Patch) Product Master Data
- Batch Request

## Sales Organization Data
### Technical Name: A_ProductSalesDelivery

### Use
This entity contains the fields related to sales data for product.

### Parameters

| Parameter | Short Description | Description | Key |
|-----------|-------------------|-------------|-----|
| Product | Product Number | Alphanumeric key uniquely identifying the Product. | Mandatory |
| ProductSalesOrg | Sales Organization | An organizational unit responsible for the sale of certain products or services | Mandatory |
| ProductDistributionChnl | Distribution Channel | The way in which products or services reach the customer. | Mandatory |
| MinimumOrderQuantity | Minimum order quantity in base unit of measure | The minimum quantity a customer may order. | Optional |
| SupplyingPlant | Delivering Plant (Own or External) | Plant from which the goods should be delivered to the customer. | Optional |
| PriceSpecificationProductGroup | Product Pricing Group | A way of grouping products to which you want to apply the same conditions. | Optional |
| AccountDetnProductGroup | Account Assignment Group for Material | Group of product with the same accounting requirements. | Optional |
| DeliveryNoteProcMinDelivQty | Minimum Delivery Quantity in Delivery Note Processing | Minimum quantity that may be delivered to a customer. | Optional |
| ItemCategoryGroup | Item category group from material master | A grouping of products that the system uses to determine item categories during the processing of sales documents. | Optional |
| DeliveryQuantityUnit | Unit of measure of delivery unit | Unit of measure that refers to the delivery unit. | Optional |
| DeliveryQuantity | Delivery Quantity | Only exact multiples of this number can be delivered | Optional |
| ProductSalesStatus | Distribution-chain-specific material status | Indicates whether, for a specific distribution chain, the product may be used in individual functions in Sales and Distribution | Optional |
| ProductSalesStatusValidityDate | Date from which distr.-chain-spec. product status is valid | Date from which distr.-chain-spec. product status is valid | Optional |
| SalesMeasureUnit | Sales Unit | Unit of measure in which the product is sold. | Optional |
| IsMarkedForDeletion | Ind.: Flag material for deletion at distribution chain level | If this indicator is set, the archive and delete program checks whether the product may be deleted at distribution chain level, and deletes the data at this level. | Optional |
| ProductHierarchy | Product Hierarchy | Alphanumeric character string for grouping together products by combining different characteristics. It is used for analyses and price determination. | Optional |
| FirstSalesSpecProductGroup | Product Group 1 | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional |
| SecondSalesSpecProductGroup | Product Group 2 | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional |
| ThirdSalesSpecProductGroup | Product Group 3 | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional |
| FourthSalesSpecProductGroup | Product Group 4 | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional |
| FifthSalesSpecProductGroup | Product Group 5 | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional |
| MinimumMakeToOrderOrderQty | Minimum make-to-order quantity | Minimum quantity allowed when the product is made to order. | Optional |
| VolumeRebateGroup | Volume rebate group | Group definition that can be used for rebate settlement. | Optional |
| ProductUnitGroup | Unit of Measure Group | Key that you can use for grouping several units of measure. You can use the unit of measure group, for example, to define allowed units of measure for a particular product for a supplier or a receiver. This is of significance for when rounding with the dynamic rounding profile if check supplier or check customer is selected in the rounding profiles. In this case, only those units of measure are included in rounding that are defined in the unit of measure group. | Optional |
| PricingReferenceProduct | Pricing Reference Material | Product master record that the system uses as a reference for pricing purposes. The conditions that apply to the pricing reference product also apply to the product in whose product master record the pricing reference product is stored. | Optional |
| ProductHasAttributeID01 | ID for product attribute 1 | Indicates whether the product has this product attribute. | Optional |
| ProductHasAttributeID02 | ID for product attribute 2 | Indicates whether the product has this product attribute. | Optional |
| ProductHasAttributeID03 | ID for product attribute 3 | Indicates whether the product has this product attribute. | Optional |


```markdown
# SAP Product Master API Documentation

## Product Description
**Technical Name:** A_ProductDescription

### Use
This entity contains the fields related to product description.

### Parameters

| Parameter           | Short Description  | Description                                        | Key Field |
|---------------------|--------------------|----------------------------------------------------|-----------|
| Product             | Product Number     | Alphanumeric key uniquely identifying the product  | Yes       |
| Language            | Language Key       | Code identifying the language set for the record. For example, EN for English | Yes       |
| ProductDescription  | Product Description| Description about the product                      | No        |

### Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data
- Update (Patch) Product Master Data
- Batch Request

## Sales Organization Data
**Technical Name:** A_ProductSalesDelivery

### Use
This entity contains the fields related to sales data for product.

### Parameters

| Parameter                          | Short Description                        | Description                                                                 | Key       |
|------------------------------------|------------------------------------------|-----------------------------------------------------------------------------|-----------|
| Product                            | Product Number                           | Alphanumeric key uniquely identifying the Product.                          | Mandatory |
| ProductSalesOrg                    | Sales Organization                       | An organizational unit responsible for the sale of certain products or services | Mandatory |
| ProductDistributionChnl            | Distribution Channel                     | The way in which products or services reach the customer.                   | Mandatory |
| MinimumOrderQuantity               | Minimum order quantity in base unit of measure | The minimum quantity a customer may order.                                  | Optional  |
| SupplyingPlant                     | Delivering Plant (Own or External)       | Plant from which the goods should be delivered to the customer.             | Optional  |
| PriceSpecificationProductGroup     | Product Pricing Group                    | A way of grouping products to which you want to apply the same conditions.  | Optional  |
| AccountDetnProductGroup            | Account Assignment Group for Material    | Group of product with the same accounting requirements.                     | Optional  |
| DeliveryNoteProcMinDelivQty        | Minimum Delivery Quantity in Delivery Note Processing | Minimum quantity that may be delivered to a customer.                       | Optional  |
| ItemCategoryGroup                  | Item category group from material master | A grouping of products that the system uses to determine item categories during the processing of sales documents. | Optional  |
| DeliveryQuantityUnit               | Unit of measure of delivery unit         | Unit of measure that refers to the delivery unit.                           | Optional  |
| DeliveryQuantity                   | Delivery Quantity                        | Only exact multiples of this number can be delivered                        | Optional  |
| ProductSalesStatus                 | Distribution-chain-specific material status | Indicates whether, for a specific distribution chain, the product may be used in individual functions in Sales and Distribution | Optional  |
| ProductSalesStatusValidityDate     | Date from which distr.-chain-spec. product status is valid | Date from which distr.-chain-spec. product status is valid                  | Optional  |
| SalesMeasureUnit                   | Sales Unit                               | Unit of measure in which the product is sold.                               | Optional  |
| IsMarkedForDeletion                | Ind.: Flag material for deletion at distribution chain level | If this indicator is set, the archive and delete program checks whether the product may be deleted at distribution chain level, and deletes the data at this level. | Optional  |
| ProductHierarchy                   | Product Hierarchy                        | Alphanumeric character string for grouping together products by combining different characteristics. It is used for analyses and price determination. | Optional  |
| FirstSalesSpecProductGroup         | Product Group 1                          | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional  |
| SecondSalesSpecProductGroup        | Product Group 2                          | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional  |
| ThirdSalesSpecProductGroup         | Product Group 3                          | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional  |
| FourthSalesSpecProductGroup        | Product Group 4                          | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional  |
| FifthSalesSpecProductGroup         | Product Group 5                          | You can use product groups when maintaining a product master record. Since these product groups are not used in the standard SAP System, you can use them as required, for example, for analyses. | Optional  |
| MinimumMakeToOrderOrderQty         | Minimum make-to-order quantity           | Minimum quantity allowed when the product is made to order.                 | Optional  |
| VolumeRebateGroup                  | Volume rebate group                      | Group definition that can be used for rebate settlement.                    | Optional  |
| ProductUnitGroup                   | Unit of Measure Group                    | Key that you can use for grouping several units of measure. You can use the unit of measure group, for example, to define allowed units of measure for a particular product for a supplier or a receiver. This is of significance for when rounding with the dynamic rounding profile if check supplier or check customer is selected in the rounding profiles. In this case, only those units of measure are included in rounding that are defined in the unit of measure group. | Optional  |
| PricingReferenceProduct            | Pricing Reference Material               | Product master record that the system uses as a reference for pricing purposes. The conditions that apply to the pricing reference product also apply to the product in whose product master record the pricing reference product is stored. | Optional  |
| ProductHasAttributeID01            | ID for product attribute 1               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID02            | ID for product attribute 2               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID03            | ID for product attribute 3               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID04            | ID for product attribute 4               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID05            | ID for product attribute 5               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID06            | ID for product attribute 6               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID07            | ID for product attribute 7               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID08            | ID for product attribute 8               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID09            | ID for product attribute 9               | Indicates whether the product has this product attribute.                   | Optional  |
| ProductHasAttributeID10            | ID for product attribute 10              | Indicates whether the product has this product attribute.                   | Optional  |
| ProductCommissionGroup             | Commission group                         | Commission group to which the product is assigned. You can assign two products to the same commission group as long as each representative who sells these materials receives the same commission percentage for both products. In other words, the commission percentages within a commission group are always the same for any one representative but may vary for different representatives. | Optional  |
| RoundingProfile                    | Rounding Profile                         | Key that the system uses to adjust the order proposal quantity to deliverable units. | Optional  |
| CashDiscountIsDeductible           | Cash discount indicator                  | Indicator that specifies whether this product qualifies for a cash discount. | Optional  |
| VariableSalesUnitIsNotAllowed      | Variable Sales Unit Not Allowed          | You can maintain the sales unit for each product and sales organization/distribution channel. The sales unit is proposed in Sales and Distribution (SD) documents such as sales orders. If a variable sales unit is not allowed, the unit specified in documents may not differ from that in the master record. | Optional  |
| LogisticsStatisticsGroup           | Product statistics group                 | Specifies a statistics group for this product and helps determine which data the system updates in the logistics information system. | Optional  |

### Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data (supported with deep payload)
- Update (Patch) Product Master Data
- Batch Request

## Sales Text
**Technical Name:** A_ProductSalesText

### Use
This entity contains the fields related to product sales text.

### Parameters

| Parameter           | Short Description  | Description                                        | Key Field |
|---------------------|--------------------|----------------------------------------------------|-----------|
| Product             | Product Number     | Alphanumeric key uniquely identifying the product. | Yes       |
| ProductSalesOrg     | Sales Organization | An organizational unit responsible for the sale of certain products or services | Yes       |
| SalesStatusValidityDate | Distribution Channel | The way in which products or services reach the customer. | Yes       |
| Language            | Language Key       | The language key indicates the language in which texts are displayed, the language in which you enter texts, and the language in which the system prints texts. | Yes       |
| LongText            | Long Text          | Additional information related to the sales data of a product. | No        |

### Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data
- Update (Patch) Product Master Data
- Batch Request

## Basic Text
**Technical Name:** A_ProductBasicText

### Use
This entity contains the fields related to product basic text.

### Parameters

| Parameter           | Short Description  | Description                                        | Key Field |
|---------------------|--------------------|----------------------------------------------------|-----------|
| Product             | Product Number     | Alphanumeric key uniquely identifying the product. | Yes       |
| Language            | Language Key       | The language key indicates the language in which texts are displayed, the language in which you enter texts, and the language in which the system prints texts. | Yes       |
| LongText            | Long Text          | Additional information related to the basic data of a product. | No        |

### Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data
- Update (Patch) Product Master Data
- Batch Request

## Units of Measure
**Technical Name:** A_ProductUnitsOfMeasure

### Use
This entity contains the fields related to product units of measure.

### Parameters

| Parameter           | Short Description  | Description                                        | Key Field |
|---------------------|--------------------|----------------------------------------------------|-----------|
| Product             | Product Number     | Alphanumeric key uniquely identifying the product. | Yes       |
| AlternativeUnit     | Alternative Unit of Measure for Stock keeping Unit | Unit of measure in which quantities can be entered alternatively to the base unit of measure/stock keeping unit. | Yes       |
| QuantityNumerator   | Numerator for Conversion to Base Units of Measure | Numerator of the quotient that specifies the ratio of the alternative unit of measure to the base unit of measure. | No        |
| QuantityDenominator | Denominator for conversion to base units of measure | Denominator of the quotient that specifies the ratio of the alternative unit of measure to the base unit of measure. | No        |
| MaterialVolume      | Volume             | Space that the product occupies per unit of volume. The volume refers to the unit specified in the "Volume unit" field. The volume and its unit always refer to the base unit of measure. | No        |
| VolumeUnit          | Volume Unit        | Unit referring to the volume of the product.       | No        |
| GrossWeight         | Gross Weight       | Gross weight expressed in the unit of weight specified by you in the Unit of weight field. | No        |
| WeightUnit          | Weight Unit        | Unit referring to the gross weight or net weight of the product. | No        |
| GlobalTradeItemNumber | International Article Number (EAN/UPC) | A standardized unit that uniquely identifies a product relating to a unit of measure or type of packaging. The International Article Number (EAN) is assigned by the manufacturer of the product. In this case, the EAN identifies the manufacturer uniquely. A company can assign EANs using "in-store" numbering techniques known only to the company. | No        |
| GlobalTradeItemNumberCategory | Category of International Article Number (EAN) | Defines how the system determines an International Article Number (EAN) to be assigned internally, and which check criteria (check digit, prefix, and so on) an EAN of this category must fulfil. | No        |
| UnitSpecificProductLength | Length        | Length of the product or its packaging, measured in the unit of dimension. | No        |
| UnitSpecificProductWidth | Width         | Breadth of the product or its packaging, measured in the unit of dimension. | No        |
| UnitSpecificProductHeight | Height       | Height of the product or its packaging, measured in the unit of dimension. | No        |
| ProductMeasurementUnit | Unit of Dimension for Length/Width/Height | Unit in which the dimensions of length, breadth, and height of a product or its packaging are measured | No        |
| LowerLevelPackagingUnit | Lower-Level Unit of Measure in a Packing Hierarchy | Lower-Level Unit of Measure in a Packing Hierarchy | No        |
| RemainingVolumeAfterNesting | Remaining Volume after Nesting (in Percentage) | Describes the remaining volume in percent when two products are stacked inside each other. | No        |
| MaximumStackingFactor | Maximum Stacking Factor | Specifies the allowed stacking factor. You can use the maximum stacking factor, for example, to specify how many pieces of a product, or how many crates can be placed on top of each other. The factor is quantity-dependent. | No        |
| CapacityUsage       | Capacity Usage     | Capacity Usage                                     | No        |

# SAP Product Master API Documentation

## Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data
- Update (Patch) Product Master Data
- Batch Request

## GTIN Data
**Technical name:** `A_ProductUnitsOfMeasureEAN`

### Use
This entity contains the fields related to product units of measure EAN.

### Parameters

| Parameter                     | Short Description                             | Description                                                                                                                                                                                                 | Key Field |
|-------------------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| Product                       | Product Number                                | Alphanumeric key uniquely identifying the product.                                                                                                                                                          | Yes       |
| AlternativeUnit               | Alternative Unit of Measure for Stock keeping Unit | Unit of measure in which quantities can be entered alternatively to the base unit of measure/stock keeping unit.                                                                                             | Yes       |
| ConsecutiveNumber             | Consecutive Number                            | Consecutive Number                                                                                                                                                                                          | Yes       |
| ProductStandardID             | International Article Number (EAN/UPC)        | A standardized unit that uniquely identifies a product relating to a unit of measure or type of packaging. The International Article Number (EAN) is assigned by the manufacturer of the product.            | No        |
| InternationalArticleNumberCat | Category of International Article Number (EAN)| Defines how the system determines an International Article Number (EAN) to be assigned internally, and which check criteria (check digit, prefix, and so on) an EAN of this category must fulfil.             | No        |
| IsMainGlobalTradeItemNumber   | Indicator: Main EAN                           | Specifies whether the International Article Number (EAN) is the main EAN for the unit of measure.                                                                                                           | No        |

## Supported Operations
The following operations are supported:
- Create Product Master Data
- Read Product Master Data
- Update Product Master Data
- Update (Patch) Product Master Data
- Batch Request

## Operations for Product Master (A2X) API
The Product Master (A2X) API offers the following operations:

| Operation                  | HTTP Method | Sample URL                                                                                     |
|----------------------------|-------------|------------------------------------------------------------------------------------------------|
| Read product master data   | GET         | GET `<host>/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product(Product='TG-17')`                      |
| Create product master data | POST        | POST `<host>/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product`                                      |
| Update product master data | PATCH, PUT  | PATCH `<host>/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product(Product='TG-17')`                    |
| Delete product master data | DELETE      | POST `<host>/sap/opu/odata/SAP/API_PRODUCT_SRV/A_ProductDescription(Product='TG-17', Language='EN')` |

## Change Sets
You can use BATCH request to group multiple operations such as create, read, update, and delete on product master data into a single HTTP request payload. Batch Requests are submitted as a single HTTP POST request to the `$batch` endpoint of a service. For example, POST `<host>/sap/opu/odata/SAP/API_PRODUCT_SRV/$batch`

## Read Product Master Data
### Purpose
With this operation, you can read product master data for the following entities using the method GET:
- A_Product
- A_ProductDescription
- A_ProductPlant
- A_ProductBasicText
- A_ProductInspectionText
- A_ProductProcurement
- A_ProductPurchaseText
- A_ProductQualityMgmt
- A_ProductSales
- A_ProductSalesTax
- A_ProductStorage
- A_ProductUnitsOfMeasure
- A_ProductSalesDelivery
- A_ProductValuation
- A_ProductMLAccount
- A_ProductMLPrices
- A_ProductPlantMRPArea
- A_ProductPlantQualityMgmt
- A_ProductPlantSales
- A_ProductPlantStorage
- A_ProductPlantText
- A_ProductPlantIntlTrd
- A_ProductPlantCosting
- A_ProductPlantForecasting
- A_ProductPlantProcurement
- A_ProductSupplyPlanning
- A_ProductWorkScheduling
- A_ProductStorageLocation
- A_ProductSalesText
- A_ProductUnitsOfMeasureEAN
- A_ProductValuationAccount

### Batch Requests
Sample URL: `/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product(Product='DEMOPRODUCT001')?$format=json`

### Response Examples
#### Request
```http
GET <host>/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product(Product='DEMOPRODUCT001')?$format=json HTTP/1.1
Content-Type: application/json
```

#### Success Response
```json
{
    "Product": "DEMOPRODUCT001",
    "ProductType": "FERT",
    "CrossPlantStatus": "01",
    "CrossPlantStatusValidityDate": "/Date(1588291200000)/",
    "CreationDate": "/Date(1583020800000)/",
    "CreatedByUser": "DEMOUSER",
    "LastChangeDate": "/Date(1583020800000)/",
    "LastChangedByUser": "DEMOUSER",
    "LastChangeDateTime": "/Date(1583073519000+0000)/",
    "IsMarkedForDeletion": false,
    "ProductOldID": "",
    "GrossWeight": "10.000",
    "PurchaseOrderQuantityUnit": "",
    "SourceOfSupply": "",
    "WeightUnit": "KG",
    "NetWeight": "9.000",
    "CountryOfOrigin": "",
    "CompetitorID": "",
    "ProductGroup": "A001",
    "BaseUnit": "EA",
    "ItemCategoryGroup": "NORM",
    "ProductHierarchy": "",
    "Division": "00",
    "VarblPurOrdUnitIsActive": "",
    "VolumeUnit": "",
    "MaterialVolume": "0.000",
    "ANPCode": "0",
    "Brand": "",
    "ProcurementRule": "",
    "ValidityStartDate": null,
    "LowLevelCode": "",
    "ProdNoInGenProdInPrepackProd": "",
    "SerialIdentifierAssgmtProfile": "",
    "SizeOrDimensionText": "",
    "IndustryStandardName": "",
    "ProductStandardID": "",
    "InternationalArticleNumberCat": "",
    "ProductIsConfigurable": false,
    "IsBatchManagementRequired": false,
    "ExternalProductGroup": "",
    "CrossPlantConfigurableProduct": "",
    "SerialNoExplicitnessLevel": "",
    "ProductManufacturerNumber": "",
    "ManufacturerNumber": "",
    "ManufacturerPartProfile": "",
    "QltyMgmtInProcmtIsActive": false,
    "IndustrySector": "M",
    "ChangeNumber": "",
    "MaterialRevisionLevel": "",
    "HandlingIndicator": "",
    "WarehouseProductGroup": "",
    "WarehouseStorageCondition": "",
    "StandardHandlingUnitType": "",
    "SerialNumberProfile": "",
    "AdjustmentProfile": "",
    "PreferredUnitOfMeasure": "",
    "IsPilferable": false,
    "IsRelevantForHzdsSubstances": false,
    "QuarantinePeriod": "0",
    "TimeUnitForQuarantinePeriod": "",
    "QualityInspectionGroup": "",
    "AuthorizationGroup": "",
    "HandlingUnitType": "",
    "HasVariableTareWeight": false,
    "MaximumPackagingLength": "0.000",
    "MaximumPackagingWidth": "0.000",
    "MaximumPackagingHeight": "0.000",
    "UnitForMaxPackagingDimensions": "",
    "to_Description": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_Description"
        }
    },
    "to_Plant": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_Plant"
        }
    },
    "to_ProductBasicText": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductBasicText"
        }
    },
    "to_ProductInspectionText": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductInspectionText"
        }
    },
    "to_ProductProcurement": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductProcurement"
        }
    },
    "to_ProductPurchaseText": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductPurchaseText"
        }
    },
    "to_ProductQualityMgmt": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductQualityMgmt"
        }
    },
    "to_ProductSales": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductSales"
        }
    },
    "to_ProductSalesTax": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductSalesTax"
        }
    },
    "to_ProductStorage": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductStorage"
        }
    },
    "to_ProductUnitsOfMeasure": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_ProductUnitsOfMeasure"
        }
    },
    "to_SalesDelivery": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_SalesDelivery"
        }
    },
    "to_Valuation": {
        "__deferred": {
            "uri": "/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('DEMOPRODUCT001')/to_Valuation"
        }
    }
}
```

#### Error Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<error xmlns="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">
    <code>/IWBEP/CM_MGW_RT/020</code>
    <message xml:lang="en">Resource not found for segment 'A_ProductType'</message>
    <innererror>
        <application>
            <component_id>LO-MD-MM</component_id>
            <service_namespace>/SAP/</service_namespace>
            <service_id>API_PRODUCT_SRV</service_id>
            <service_version>0001</service_version>
        </application>
        <transactionid>A8B79913143305D0E005EC39DDE1C27B</transactionid>
        <timestamp>20200520043936.3110760</timestamp>
        <Error_Resolution>
            <SAP_Transaction>For backend administrators: use ADT feed reader "SAP Gateway Error Log" or run transaction /IWFND/ERROR_LOG on SAP Gateway hub system and search for entries with the timestamp above for more details</SAP_Transaction>
            <SAP_Note>See SAP Note 1797736 for error analysis (https://service.sap.com/sap/support/notes/1797736)</SAP_Note>
        </Error_Resolution>
        <errordetails>
            <errordetail>
                <code>/IWBEP/CX_MGW_BUSI_EXCEPTION</code>
                <message>Resource not found for segment 'A_ProductType'</message>
                <propertyref/>
                <severity>error</severity>
                <target/>
                <transition>false</transition>
            </errordetail>
        </errordetails>
    </innererror>
</error>
```