import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import homesRoutes from './routes/homes'
import authorsRoutes from './routes/authors'
import booksRoutes from './routes/books'

const app = express()

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Properly Demo Serverless API",
            version: "1.0.0",
            description:
                "Properly Demo API with Typescript, Lambda, DynamoDB and Express.",
            contact: {
                name: "Manjyot Singh Saini",
                url: "https://www.linkedin.com/in/manjyotss",
                email: "manjyotssaini@gmail.com",
            },
        },
        servers: [
            {
                url: "https://72srvwu9hj.execute-api.us-east-1.amazonaws.com",
                description: 'Development server',
            }
        ],
    },
    apis: ["src/routes/*.ts", "src/entities/*.ts", "src/controllers/*.ts"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/homes', homesRoutes)
app.use('/authors', authorsRoutes)
app.use('/books', booksRoutes)

export default app
