"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
class ExpenseService {
    constructor(expenseDao) {
        this.expenseDao = expenseDao;
    }
    async createExpense(expense) {
        try {
            const newExpense = await this.expenseDao.createExpense(expense);
            return newExpense;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getExpencies() {
        try {
            const expencies = await this.expenseDao.getExpencies();
            return expencies;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async updateExpense(expense) {
        try {
            const updatedExpense = await this.expenseDao.updateExpense(expense);
            return updatedExpense;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async deleteExpense(expenseId) {
        try {
            const deletedExpense = await this.expenseDao.deleteExpense(expenseId);
            return deletedExpense;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
}
exports.ExpenseService = ExpenseService;
