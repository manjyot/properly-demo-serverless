# Serverless Sample API

A serverless implementation of a Typescript sample API with AWS Lambda, API Gateway, DynamoDB, Swagger, Express for routing and Jest for unit testing.  

## Pre-requisites

- [Node.js](https://nodejs.org/)
- [Serverless CLI](https://serverless.com/)  

## Available Endpoints

The API implements 3 CRUD routes - /homes, /authors and /books. 

Authors and Books were implemented to demonstrate the model relationships.  

## API Doc

OpenAPI doc using Swagger UI can be accessed at the following link:  
  
[OpenAPI Doc](https://72srvwu9hj.execute-api.us-east-1.amazonaws.com/docs)  

## Usage

Install dependencies with:

```
npm install
```

Configure AWS credentials:

```
export AWS_SECRET_ACCESS_KEY=  
export AWS_ACCESS_KEY_ID=
```

Deploy with:

```
serverless deploy
```