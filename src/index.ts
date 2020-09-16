// Imports
import express from 'express';
import cors from 'cors';

// App Imports
import setupGraphQL from './setup/graphql';
import { createServer } from 'http';
import {createConnection} from "typeorm";
const config = require('./config/config');

// Create express server
const server = express();

//cors
server.use('*', cors());

// Setup GraphQL
setupGraphQL(server);

//create Connection
createConnection();

// Start web server
const httpServer = createServer(server);
httpServer.listen(config.port, (error: any) => {
    if (error) {
        console.error('ERROR - Unable to start server.')
    } else {
        console.info(`INFO - Server started on port http://localhost:${config.port}/graphql`)
    }
});