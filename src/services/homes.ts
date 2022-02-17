import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as randomUUID } from 'uuid'
import { HOMES_TABLE } from '../db/dynamo'

import type {
  Home,
  HomeInput,
  HomeUpdateInput
} from '../entities/home'

export class HomesService {
  constructor(private readonly dynamoDbClient: DocumentClient) {}

  async findAll(): Promise<Home[]> {
    const homes = await this.dynamoDbClient
      .scan({
        TableName: HOMES_TABLE,
        ProjectionExpression: 'id, streetAddress, unitNumber, city, province, country, postalCode',
      })
      .promise()

    const items = homes.Items

    return items as Home[]
  }

  async findOne(id: string): Promise<Home> {
    const homeReq = await this.dynamoDbClient
      .get({
        TableName: HOMES_TABLE,
        Key: {
          id,
        },
        ProjectionExpression: 'id, streetAddress, unitNumber, city, province, country, postalCode',
      })
      .promise()

    const home = {
      ...homeReq.Item
    }

    return home as Home
  }

  async create(home: HomeInput): Promise<Home> {
    const createdHome = await this.dynamoDbClient
      .put({
        TableName: HOMES_TABLE,
        Item: {
          id: randomUUID(),
          ...home,
        },
        ReturnValues: 'ALL_OLD',
      })
      .promise()

    return createdHome.Attributes as Home
  }

  async update(id: string, home: HomeUpdateInput): Promise<Home> {
    const updateExpresion = String('SET ').concat(
      Object.keys(home)
        .filter((key) => !!home[key])
        .map((key) => `${key} = :${key}`)
        .join(', ')
    )

    const expressionAttributeValues = Object.keys(home)
      .filter((key) => !!home[key])
      .reduce((acc, key) => {
        acc[`:${key}`] = home[key]

        return acc
      }, {})

    const updatedHome = await this.dynamoDbClient
      .update({
        TableName: HOMES_TABLE,
        Key: {
          id,
        },
        UpdateExpression: updateExpresion,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      })
      .promise()

    return updatedHome.Attributes as Home
  }

  async delete(id: string): Promise<void> {
    await this.dynamoDbClient
      .delete({
        TableName: HOMES_TABLE,
        Key: {
          id,
        },
      })
      .promise()
  }
}
