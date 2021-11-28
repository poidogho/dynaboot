import { IConfig } from './iconfig';
const mongodbURI =
  'mongodb+srv://dafe123:dafe123@cluster0.f75u8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
export const config: IConfig = {
  port: Number(process.env.PORT) || 30080,
  dbConnectionString: process.env.DB_CONNECTION_STRING || mongodbURI
};
