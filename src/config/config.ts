import { IConfig } from './iconfig';

export const config: IConfig = {
  port: Number(process.env.PORT) || 30080,
  dbConnectionString: process.env.DB_CONNECTION_STRING
};
