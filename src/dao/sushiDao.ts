import { Response } from 'lambda-api';
import { config } from 'node-config-ts';
import { UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { client } from '../db/client';
import { Sushi, SushiItem } from '../types';
const nanoid = require('nanoid');

const stage = process.env.STAGE || 'dev';
const table = `${config.table}-${stage}`;

export class SushiDao {
  private res: Response;
  constructor(response: Response) {
    this.res = response;
  }
  findById(id: string): Promise<Sushi> {
    const getItemParams = {
      TableName: table,
      Key: { id: id },
    };
    try {
      return client
        .get(getItemParams)
        .promise()
        .then(res => res.Item as Sushi);
    } catch (e) {
      console.error(e);
    }
  }
  findAll(): Promise<Sushi[]> {
    try {
      const scanItemParams = {
        TableName: table,
      };
      return client
        .scan(scanItemParams)
        .promise()
        .then(res => res.Items as Sushi[]);
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
      client.put(putItemParams).promise();
      // TODO: class にして this.findById の結果を返したい
      return this.findById(id);
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
      const res = client.update(updateItemParams).promise();
      return this.findById(sushi.id);
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
      client.delete(deleteItemParams).promise();
    } catch (e) {
      console.error(e);
    }
    return id;
  }
}
