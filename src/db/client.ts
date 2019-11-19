// import AWSXRay from 'aws-xray-sdk-core';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const config = process.env.DYNAMODB_LOCAL
  ? { region: 'ap-northeast-1', endpoint: 'http://localhost:8000/' }
  : { region: 'ap-northeast-1' };
// export const ddbDocumentClient = new DynamoDB(config);
export const ddb = new DynamoDB(config);

export const ddbDocumentClient = new DocumentClient(config);
// AWSXRay.captureAWSClient((ddbDocumentClient as any).service);
