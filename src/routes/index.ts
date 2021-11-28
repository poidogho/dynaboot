import express from 'express';
import { ExpenseRoutes } from './expense-routes';
import { ExpenseDao } from '../dao/expense-dao';
import { ExpenseService } from '../services/expense-service';

const router = express.Router();

const expenseDao = new ExpenseDao();
const expenseService = new ExpenseService(expenseDao);
const routes = [new ExpenseRoutes(expenseService, router)];

export { routes };
