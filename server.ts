require('dotenv').config();
require('./src/models/expense');
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { config } from './src/config/config';
import { routes } from './src/routes';

let server = express();

// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: true
// };

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
  const server = initializeServer();
  await connectToDB();

  routes.forEach((route) => route.initialize(server));

  server.get('/healthz', (_, res) => {
    res.sendStatus(200);
  });
  const startUpMessage = `Server is up and listening on ${config.port}`;

  server.listen(config.port, () => console.log(startUpMessage));
};

start().catch((err) => {
  console.log(`Server crashed unexpectedly due to ${err}`);
});
