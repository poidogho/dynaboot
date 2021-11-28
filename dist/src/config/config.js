"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const mongodbURI = 'mongodb+srv://dafe123:dafe123@cluster0.f75u8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
exports.config = {
    port: Number(process.env.PORT) || 30080,
    dbConnectionString: process.env.DB_CONNECTION_STRING || mongodbURI
};
