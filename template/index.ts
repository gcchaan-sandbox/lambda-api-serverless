import { DynamoDB } from 'cloudform';
import { config } from 'node-config-ts';

const stage = process.env.STAGE || 'dev';

export default {
  DynamoDBMessageLogTable: new DynamoDB.Table({
    TableName: `${config.table}-${stage}`,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
  }),
};
