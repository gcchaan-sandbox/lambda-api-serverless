import { Response } from 'lambda-api';
import { config } from 'node-config-ts';
import { UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { ddb } from '../db/client';
import { Sushi, SushiItem } from '../types';
const nanoid = require('nanoid');

function mapper(param: SushiItem): Sushi {
  const { id, sushi_name, price } = param;
  return {
    id: id.S,
    name: sushi_name.S,
    price: parseInt(price.N),
  };
}

const stage = process.env.STAGE || 'dev';
const table = `${config.ddb.table}-${stage}`;

export class SushiDao {
  private res: Response;
  constructor(response: Response) {
    this.res = response;
  }
  findById(id: string): Promise<Sushi> {
    const getItemParams = {
      TableName: table,
      Key: { id: { S: id } },
    };
    try {
      return ddb
        .getItem(getItemParams)
        .promise()
        .then(res => mapper(res.Item as SushiItem));
    } catch (e) {
      console.error(e);
    }
  }
  findAll(): Promise<Sushi[]> {
    try {
      const scanItemParams = {
        TableName: table,
      };
      return ddb
        .scan(scanItemParams)
        .promise()
        .then(res => res.Items.map((sushi: SushiItem) => mapper(sushi)));
    } catch (e) {
      console.error(e);
    }
  }
  save(param: Omit<Sushi, 'id'>) {
    const id = nanoid(10);
    try {
      const sushi: SushiItem = {
        id: { S: id },
        sushi_name: { S: param.name },
        price: { N: param.price.toString() },
      };
      const putItemParams = {
        TableName: table,
        Item: sushi,
      };
      ddb.putItem(putItemParams).promise();
      // TODO: class にして this.findById の結果を返したい
      return id;
    } catch (e) {
      console.error(e);
    }
  }
  update(sushi: Sushi) {
    const updateItemParams: UpdateItemInput = {
      TableName: table,
      Key: {
        id: { S: sushi.id },
      } as SushiItem,
      UpdateExpression: 'set sushi_name = :sushi_name, price = :price',
      ExpressionAttributeValues: {
        ':sushi_name': { S: sushi.name },
        ':price': { N: sushi.price.toString() },
      },
    };
    try {
      const res = ddb.updateItem(updateItemParams).promise();
      return res;
    } catch (e) {
      console.error(e);
    }
  }
  deleteById(id: string) {
    const deleteItemParams = {
      TableName: table,
      Key: { id: { S: id } },
    };
    try {
      ddb.deleteItem(deleteItemParams).promise();
    } catch (e) {
      console.error(e);
    }
    return id;
  }
}
