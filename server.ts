require('dotenv').config();
require('./src/models/expense');

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { config } from './src/config/config';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
};

const initializeServer = () => {
  let server = express();
  server.use(express.json({ limit: '50mb' }));
  server.use(
    express.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  );
  server.use(cors());
  return server;
};

const connectToDB = async () => {
  console.log(config.dbConnectionString);
  await mongoose.connect(`${config.dbConnectionString}?${options}`);
  console.log('connected to db');
};

const start = async () => {
  const server = initializeServer();
  await connectToDB();
  const startUpMessage = `Server is up and listening on ${config.port}`;

  server.listen(config.port, () => console.log(startUpMessage));
};

start().catch((err) => {
  console.log(`Server crashed unexpectedly due to ${err}`);
});
