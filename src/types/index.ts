import { AttributeMap } from 'aws-sdk/clients/dynamodb';

export interface Sushi {
  id: string;
  name: string;
  price: number;
}

export interface SushiItem extends AttributeMap {
  id: { S: string };
  sushi_name: { S: string };
  price: { N: string };
}
