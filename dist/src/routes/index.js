"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const expense_routes_1 = require("./expense-routes");
const expense_dao_1 = require("../dao/expense-dao");
const expense_service_1 = require("../services/expense-service");
const router = express_1.default.Router();
const expenseDao = new expense_dao_1.ExpenseDao();
const expenseService = new expense_service_1.ExpenseService(expenseDao);
const routes = [new expense_routes_1.ExpenseRoutes(expenseService, router)];
exports.routes = routes;
