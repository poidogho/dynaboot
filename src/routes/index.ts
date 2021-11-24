import { ExpenseRoutes } from './expense-routes';
import { ExpenseDao } from '../dao/expense-dao';
import { ExpenseService } from '../services/expenseService';

const expenseDao = new ExpenseDao();
const expenseService = new ExpenseService(expenseDao);
const routes = [new ExpenseRoutes(expenseService)];

export { routes };
