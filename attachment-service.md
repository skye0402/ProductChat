# Attachment Service API Documentation

## Overview

The Attachment Service API is used to manage attachments for business objects. It allows operations such as creating, reading, renaming, and deleting attachments. The service also supports reading existing document info records (DIR) and adding attachments to them.

**Technical name:** API_CV_ATTACHMENT_SRV

## Features

- Manage attachments and attachment URLs for business objects
- Create, read, rename, and delete attachments
- Read existing document info records (DIR)
- Add attachments to existing DIRs
- Support for Harmonized Document Management (HDM) functionality
- Upload and download attachments larger than 100MB (with HDM configuration)

## Important Notes

- This service does not support draft features and is not compatible with draft-enabled applications.
- A virus scanner analyzes every attachment uploaded or downloaded for malicious content.

## Service Structure

The service metadata file can be retrieved through the following path:
```
<host:port>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/$metadata
```

### Entities

1. **Document Management (AttachmentContentSet)**
   - Used to create attachments and serves as a response for certain operations.

2. **Attachments for Document Info Record (A_DocumentInfoRecordAttch)**
   - Retrieves details of a document info record (DIR).
   - Allows navigation to the AttachmentContentSet entity for more details.

3. **Harmonized Document Management (AttachmentHarmonizedOperationSet)**
   - Used to create attachments and serves as a response for certain operations.
   - Applicable for business objects with HDM enabled in Customizing.

## Service Response

### Document Management (AttachmentContentSet)

| Parameter | Description |
|-----------|-------------|
| DocumentInfoRecordDocType | Document Info Record Document Type |
| DocumentInfoRecordDocNumber | Document Info Record Document Number |
| DocumentInfoRecordDocPart | Document Info Record Document Part |
| DocumentInfoRecordDocVersion | Document Info Record Document Version |
| LogicalDocument | Logical document ID |
| ArchiveDocumentID | Physical Document ID |
| LinkedSAPObjectKey | Concatenated Business Object Key |
| BusinessObjectTypeName | Business Object Type Name (e.g., MARA, DRAW, BUS1001006) |
| SemanticObject | Semantic Object |
| WorkstationApplication | Workstation Application |
| FileSize | File Size |
| FileName | File Name |
| DocumentURL | Document URL |
| MimeType | Mime Type (e.g., application/png) |
| Content | File to be created (must be in SAP-supported format) |
| CreatedByUser | Created By User |
| CreatedByUserFullName | Created By User Full Name |
| CreationDateTime | Creation Date Time |
| BusinessObjectType | Business Object Type |
| LastChangedByUserFullName | Last Changed By User Full Name |
| ChangedDateTime | Changed Date Time |
| LastChangedByUser | Last Changed By User |
| StorageCategory | Storage category where files are stored |
| ArchiveLinkRepository | Archive Link Repository |
| SAPObjectType | Name of the business object |
| SAPObjectNodeType | Name of the business object node |
| HarmonizedDocumentType | Document type of the attachment |
| AttachmentDeletionIsAllowed | Is Attachment Deletion Allowed |
| AttachmentRenameIsAllowed | Is Attachment Rename Allowed |
| Source | Document framework (DMS or GOS) |

### Attachments for Document Info Record (A_DocumentInfoRecordAttch)

| Parameter | Description |
|-----------|-------------|
| DocumentInfoRecordDocType | Document Info Record Document Type |
| DocumentInfoRecordDocNumber | Document Info Record Document Number |
| DocumentInfoRecordDocPart | Document Info Record Document Part |
| DocumentInfoRecordDocVersion | Document Info Record Document Version |
| DocumentInfoRecord | Document Info Record |
| DocInfoRecdIsMarkedForDeletion | True if the document is marked for deletion |
| DocumentDescription | Document Description |
| DocumentStatusName | Description of the status |
| ExternalDocumentStatus | External status of the document |

### Harmonized Document Management (AttachmentHarmonizedOperationSet)

| Parameter | Description |
|-----------|-------------|
| DocumentInfoRecordDocType | Document Info Record Document Type |
| DocumentInfoRecordDocNumber | Document Info Record Document Number |
| DocumentInfoRecordDocVersion | Document Info Record Document Version |
| DocumentInfoRecordDocPart | Document Info Record Document Part |
| LogicalDocument | Logical Document |
| ArchiveDocumentID | Physical Document ID |
| LinkedSAPObjectKey | Concatenated Business Object Key |
| BusinessObjectTypeName | Business object type name |
| FileSize | File Size |
| FileName | File Name |
| MimeType | Mime Type |
| CheckoutUser | Name of the user who has checked out the document |
| CheckoutUserFullName | Full name of the user who has checked out the document |
| CreatedByUser | Created By User |
| CreatedByUserFullName | Created By User Full Name |
| CreationDateTime | Creation Date Time |
| LastChangedByUser | Last Changed By User |
| LastChangedByUserFullName | Last Changed By User Full Name |
| ChangedDateTime | Changed Date Time |
| StorageCategory | Storage category where files are stored |
| ArchiveLinkRepository | Archive Link Repository |
| SAPObjectType | Name of the business object |
| SAPObjectNodeType | Name of the business object node |
| HarmonizedDocumentType | Document type of the attachment |
| AttachmentDeletionIsAllowed | Is Attachment Deletion Allowed |
| AttachmentRenameIsAllowed | Is Attachment Rename Allowed |
| URLToUploadAttachment | URL to upload an attachment (for large attachments) |
| URLToReadAttachment | URL to download an attachment (for large attachments) |
| OneTimeValidTokenForAttachment | One-time valid token to upload or download attachments |

## Constraints

1. Updating the content of an attachment is not possible.
2. Maximum file size limit for uploading or downloading attachments is 100 MB (up to 1.75 GB with HDM configuration).
3. For non-HDM configured business objects, separate API calls are required to read DMS and GOS based attachments.

## Additional Information

- [API on SAP Business Accelerator Hub](https://api.sap.com/api/API_CV_ATTACHMENT_SRV/overview)
- For more details about Communication Management, see [Communication Management](https://help.sap.com/viewer/p/SAP_S4HANA_ON-PREMISE) documentation.

## Operations for Attachment Service

The Attachment API offers the following operations:

| Operation | HTTP Method | Sample URL |
|-----------|-------------|------------|
| Create Attachment Content | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/AttachmentContentSet` |
| Delete Attachment Content | DELETE | `DELETE <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/AttachmentContentSet(DocumentInfoRecordDocType='DRW',DocumentInfoRecordDocNumber='10000007880',DocumentInfoRecordDocPart='000',DocumentInfoRecordDocVersion='00',LogicalDocument='40F2E9AFC5001ED796FE016B546892AD',ArchiveDocumentID='40F2E9AFC5001ED796FE016B5468D2AD',LinkedSAPObjectKey='SAPTESTING',BusinessObjectTypeName='MARA')` |
| Get All Originals | GET | `GET <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/GetAllOriginals?BusinessObjectTypeName=%27MARA%27&LinkedSAPObjectKey=%27SAPTEST%27` |
| Get All Originals (HDM enabled) | GET | `GET <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/GetAllOriginals?BusinessObjectTypeName=''&LinkedSAPObjectKey='000000000000210706'&SAPObjectType='Product'` |
| Get Attachment Count | GET | `GET <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/GetAttachmentCount?BusinessObjectTypeName=%27MARA%27&LinkedSAPObjectKey=%27TESTMATNR999%27` |
| Get Attachment Count (HDM enabled) | GET | `GET <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/GetAttachmentCount?LinkedSAPObjectKey='000000000000212024'&SAPObjectType='Product'` |
| Create URL as Attachment | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/CreateUrlAsAttachment?SemanticObject='Product'&BusinessObjectTypeName='MARA'&LinkedSAPObjectKey='ZSP_MARA_101'&Url='https://www.tut.by/'&UrlDescription='News TUT.BY'&MIMEType='text/url'` |
| Create URL as Attachment (HDM enabled) | POST | `POST <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/CreateUrlAsAttachment?SemanticObject=''&BusinessObjectTypeName=''&LinkedSAPObjectKey='000000000000210706'&Url='https://www.google.com'&UrlDescription='For More Info'&MIMEType='text/url'&SAPObjectType='Product'&HarmonizedDocumentType='ASM'` |
| Rename Attachment | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/RenameAttachment?DocumentInfoRecordDocNumber='10000055149'&DocumentInfoRecordDocPart='000'&DocumentInfoRecordDocType='DRW'&DocumentInfoRecordDocVersion='00'&LinkedSAPObjectKey='DRW000000000000001000005514900000'&BusinessObjectTypeName='DRAW'&LogicalDocument='42F2E9AFC4EF1ED7B490672DE7FC9D36'&ArchiveDocumentID='42F2E9AFC4EF1ED7B490672DE7FCDD36'&FileName='yoyo/7ysrv.txt'` |
| Rename Attachment (HDM enabled) | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/RenameAttachment?DocumentInfoRecordDocNumber='10000096606'&DocumentInfoRecordDocPart='000'&DocumentInfoRecordDocType='ASM'&DocumentInfoRecordDocVersion='00'&LinkedSAPObjectKey='000000000000212572'&LogicalDocument='0894EF4577A91EEB8CF19443A6C27522'&ArchiveDocumentID='0894EF4577A91EEB8CF19443A6C2B522'&SAPObjectType='Product'&SAPObjectNodeType=''&FileName='NewNameForCycle.docx'` |
| Download Attachment Content | GET | `GET <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/AttachmentContentSet(DocumentInfoRecordDocType='002',DocumentInfoRecordDocNumber='10000005787',DocumentInfoRecordDocPart='000',DocumentInfoRecordDocVersion='00',LogicalDocument='42F2E9AFC3DF1ED98992410BEFED17C0',ArchiveDocumentID='42F2E9AFC3DF1ED98992410BEFED57C0',LinkedSAPObjectKey='002000000000000001000000578700000',BusinessObjectTypeName='DRAW')/$value` |
| Download Attachment Content for Large Files | GET | `GET <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentHarmonizedOperationSet(LinkedSAPObjectKey='000000000000212572',SAPObjectType='Product',LogicalDocument='0894EF4577A91EEB8CF19443A6C27522',ArchiveDocumentID='0894EF4577A91EEB8CF19443A6C2B522',HarmonizedDocumentType='ASM')` |
| Create Attachment Content (Large Files) | POST | `POST <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentHarmonizedOperationSet` |
| Get List of Active Document Types | GET | `GET <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/GetSAPObjectDocumentType?SAPObjectType='Product'` |
| Delete Attachment | DELETE | `DELETE <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentHarmonizedOperationSet(LogicalDocument='0894EF4577391EDABFAC495900BBCB59',ArchiveDocumentID='0894EF4577391EDABFAC495900BC0B59',LinkedSAPObjectKey='000000000000210145',SAPObjectType='Product',HarmonizedDocumentType='DRW')` |
| Assign Documents to Business Objects | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/AssignDocumentToBusinessObject?ArchiveDocumentID='0894EF4577391EEAB0B50AEA80BAC01E'&SourceBusinessObjectTypeName=''&SourceLinkedSAPObjectKey='ZSP_TEST_MARA1'&SourceSAPObjectType='Product'&SourceSAPObjectNodeType=''&TargetBusinessObjectTypeName=''&TargetLinkedSAPObjectKey='NT_TEST_MAT01'&TargetSAPObjectType='Product'&TargetSAPObjectNodeType=''` |
| Create Attachments for SAP Object Node Types | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/AttachmentForSAPObjectNodeTypeSet` |
| Link Attachments to SAP Object Node Types | POST | `POST <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/LinkAttachmentToSAPObjectNode?SAPObjectType='PurchaseRequisition'&SAPObjectNodeType='PurchaseRequisitionItem'&LinkedSAPObjectKey='1001010'&ArchiveDocumentID='42010AEF4C961EEDAAEDA4B0C8A1C780'&LogicalDocument='42010AEF4C961EEDAAEDA4B0C8A18780'&HarmonizedDocumentType='SL1'` |
| Download Attachments from SAP Object Node Types | GET | `GET <host>/sap/opu/odata/SAP/API_CV_ATTACHMENT_SRV/AttachmentForSAPObjectNodeTypeSet(SAPObjectType='PurchaseRequisition',SAPObjectNodeType='PurchaseRequisitionItem',LinkedSAPObjectKey='001239196600010',ArchiveDocumentID='42010AEF4CA31EEDABA32C603E7293CD',LogicalDocument='42010AEF4CA31EEDABA32C603E7253CD',HarmonizedDocumentType='SL1')` |
| Delete Attachments for SAP Object Node Types | DELETE | `DELETE <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentForSAPObjectNodeTypeSet(LogicalDocument='42010AEF4CA31EDDABA0F47D47312499',ArchiveDocumentID='42010AEF4C31EDDABA0F49B91AA649B',LinkedSAPObjectKey='400010889000010',SAPObjectType='PurchaseRequisition',HarmonizedDocumentType='SL1',SAPObjectNodeType='PurchaseRequisitionItem')` |

## Download Attachment Content

This operation allows you to download an attachment from a business object. You must use the HTTP method GET to perform this operation. You can use the Get All Originals operation to retrieve the metadata of the attachment that you want to download.

If the Harmonized Document Management (HDM) functionality is enabled for the business object in Customizing, then you can download the attachment only if it belongs to an active document framework.

### Request

You must include the following properties in the URL of the request:

| Property | Necessity | Comment |
|----------|-----------|---------|
| DocumentInfoRecordDocType | Mandatory | Part of the document key that categorizes documents according to their distinguishing features and the organizational procedures that result from them. |
| DocumentInfoRecordDocNumber | Mandatory | This number is the main part of the document key that is used to identify the document. |
| DocumentInfoRecordDocPart | Mandatory | Part of the document key that indicates the document part number. |
| DocumentInfoRecordDocVersion | Mandatory | Part of the document key that indicates the version of the document. |
| BusinessObjectTypeName | Mandatory | Name of the business object type such as MARA, EBAN, and so on. |
| LogicalDocument | Mandatory | Logical document ID. |
| ArchiveDocumentID | Mandatory | Unique document key (document ID) assigned to stored document by the content server. |
| LinkedSAPObjectKey | Mandatory | Number that identifies the master record of an object that is allocated to a document. |

### Response

The status code 200 is sent on successful completion of the operation.

### Examples

#### Request

```
GET <host>/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentContentSet(DocumentInfoRecordDocType='SL1',DocumentInfoRecordDocNumber='10000002076',DocumentInfoRecordDocPart='000',DocumentInfoRecordDocVersion='00',LogicalDocument='1C98EC1818551EDA998508E3A05E0BCE',ArchiveDocumentID='1C98EC1818551EDA998508E3A05E4BCE',LinkedSAPObjectKey='TESTEKKO',BusinessObjectTypeName='EKKO_RFQ')/$value
```

#### Response

```
status_code:  200 OK
```