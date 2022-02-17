import AWS from 'aws-sdk'

export const HOMES_TABLE = process.env.HOMES_TABLE
export const AUTHORS_TABLE = process.env.AUTHORS_TABLE
export const BOOKS_TABLE = process.env.BOOKS_TABLE

const dynamoDbClient = new AWS.DynamoDB.DocumentClient()

export default dynamoDbClient