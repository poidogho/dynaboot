"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-require-imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./src/models/expense');
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./src/config/config");
const routes_1 = require("./src/routes");
const server = (0, express_1.default)();
const initializeServer = () => {
    server.use(express_1.default.json({ limit: '50mb' }));
    server.use(express_1.default.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000
    }));
    server.use((0, cors_1.default)());
    server.use((0, morgan_1.default)('dev'));
    return server;
};
const connectToDB = async () => {
    await mongoose_1.default.connect(config_1.config.dbConnectionString);
    console.log('connected to db');
};
const start = async () => {
    const app = initializeServer();
    await connectToDB();
    routes_1.routes.forEach((route) => route.initialize(server));
    app.get('/healthz', (_, res) => {
        res.sendStatus(200);
    });
    const startUpMessage = `Server is up and listening on ${config_1.config.port}`;
    app.listen(config_1.config.port, () => console.log(startUpMessage));
};
start().catch((err) => {
    console.log(`Server crashed unexpectedly due to ${err}`);
});
