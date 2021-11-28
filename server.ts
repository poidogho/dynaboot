/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-require-imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./src/models/expense');
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { config } from './src/config/config';
import { routes } from './src/routes';

const server = express();

const initializeServer = () => {
  server.use(express.json({ limit: '50mb' }));
  server.use(
    express.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  );
  server.use(cors());
  server.use(morgan('dev'));
  return server;
};

const connectToDB = async () => {
  console.log(config.dbConnectionString);
  await mongoose.connect(config.dbConnectionString);
  console.log('connected to db');
};

const start = async () => {
  const app = initializeServer();
  await connectToDB();

  routes.forEach((route) => route.initialize(server));

  app.get('/healthz', (_, res) => {
    res.sendStatus(200);
  });
  const startUpMessage = `Server is up and listening on ${config.port}`;

  app.listen(config.port, () => console.log(startUpMessage));
};

start().catch((err) => {
  console.log(`Server crashed unexpectedly due to ${err}`);
});
