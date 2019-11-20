import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const config = process.env.DYNAMODB_LOCAL
  ? { region: 'ap-northeast-1', endpoint: 'http://localhost:8000/' }
  : { region: 'ap-northeast-1' };

export const client = new DocumentClient(config);
