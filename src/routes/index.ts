import express from 'express';
import { ExpenseRoutes } from './expense-routes';
import { ExpenseDao } from '../dao/expense-dao';
import { ExpenseService } from '../services/expenseService';

const router = express.Router();

const expenseDao = new ExpenseDao();
const expenseService = new ExpenseService(expenseDao);
const routes = [new ExpenseRoutes(expenseService, router)];

export { routes };
