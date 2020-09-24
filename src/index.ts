// Imports
import express from 'express';
import cors from 'cors';

// App Imports
import { createServer } from 'http';
import { createConnection } from "typeorm";
const config = require('./config/config');
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import { checkJwt } from './middlewares/jwt';

// Create express server
const app = express();

//cors
app.use('*', cors());

//create Connection
createConnection();

// Start server
const server = new ApolloServer({
    schema: schema,
    introspection: true, // Necesario
});

server.applyMiddleware({ app });

app.use('/', expressPlayground({
    endpoint: '/graphql'
}
));
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

httpServer.listen({ port: PORT }, (): void => console.log(`http://localhost:${PORT}/graphql`));
