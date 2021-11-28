import * as mongoose from 'mongoose';
import { Expense } from '../domain-models.ts/types';

export class ExpenseDao {
  expense: mongoose.Model<Expense>;
  constructor() {
    this.expense = mongoose.model('Expense');
  }

  async createExpense(expense: Expense): Promise<Expense> {
    try {
      const newExpense = new this.expense(expense);
      return newExpense.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getExpencies(): Promise<Array<Expense>> {
    try {
      return await this.expense.find();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateExpense(expense: Expense): Promise<Expense> {
    try {
      if (!expense._id) {
        throw new Error(
          'Expense Id is required to update a particular expense'
        );
      }
      return await this.expense.findByIdAndUpdate(
        { _id: expense._id },
        expense,
        { new: true }
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteExpense(expenseId: string): Promise<Expense> {
    try {
      if (!expenseId) {
        throw new Error('Expense Id is required to delete a paricular expense');
      }
      return this.expense.findByIdAndDelete({ _id: expenseId });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
