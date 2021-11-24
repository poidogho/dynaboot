import { IExpenseService } from '../typings';
import express, { Request, Response } from 'express';

export class ExpenseRoutes {
  expenseService: IExpenseService;
  router: any;
  constructor(expenseService: IExpenseService) {
    this.expenseService = expenseService;
    this.router = express.Router();
  }

  initialize(server: any): void {
    console.log('called', this.router, server);
    this.router.post('/expensies/', (req: Request, res: Response) =>
      this.createExpense(req, res)
    );
    this.router.get('/expensies/', (req: Request, res: Response) =>
      this.getExpensies(req, res)
    );
  }

  async createExpense(req: Request, res: Response) {
    try {
      const { body } = req;
      const newExpense = await this.expenseService.createExpense(body);
      res.send({
        expense: newExpense,
        status: 200
      });
    } catch (err) {
      res.status(500);
    }
  }

  async getExpensies(req: Request, res: Response) {
    try {
      const expensies = await this.expenseService.getExpencies();
      res.send({
        expensies,
        status: 200
      });
    } catch (err) {
      res.send(500).json({
        err
      });
    }
  }

  async updateExpense(req: Request, res: Response) {
    try {
    } catch (err) {}
  }
}
