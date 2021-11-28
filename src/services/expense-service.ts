import { IExpenseService, IExpenseDao } from '../typings';
import { Expense } from '../domain-models.ts/types';

export class ExpenseService implements IExpenseService {
  expenseDao: IExpenseDao;
  constructor(expenseDao: IExpenseDao) {
    this.expenseDao = expenseDao;
  }

  async createExpense(expense: Expense): Promise<Expense> {
    try {
      const newExpense = await this.expenseDao.createExpense(expense);
      return newExpense;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getExpencies(): Promise<Expense[]> {
    try {
      const expencies = await this.expenseDao.getExpencies();
      return expencies;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateExpense(expense: Expense): Promise<Expense> {
    try {
      const updatedExpense = await this.expenseDao.updateExpense(expense);
      return updatedExpense;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteExpense(expenseId: string): Promise<Expense> {
    try {
      const deletedExpense = await this.expenseDao.deleteExpense(expenseId);
      return deletedExpense;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
