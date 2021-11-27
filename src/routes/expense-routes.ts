import { IExpenseService, StatusCodes } from '../typings';
import { Request, Response } from 'express';

export class ExpenseRoutes {
  public static TAX = 15;
  expenseService: IExpenseService;
  router: any;
  constructor(expenseService: IExpenseService, router: any) {
    this.expenseService = expenseService;
    this.router = router;
  }

  initialize(server: any): void {
    this.router.post('/expenses/', (req: Request, res: Response) =>
      this.createExpense(req, res)
    );
    this.router.get('/expenses/', (req: Request, res: Response) =>
      this.getExpensies(req, res)
    );
    this.router.patch('/expenses/:expenseId', (req: Request, res: Response) =>
      this.updateExpense(req, res)
    );
    this.router.delete('/expenses/:expenseId', (req: Request, res: Response) =>
      this.deleteExpense(req, res)
    );
    server.use('/api', this.router);
  }

  async createExpense(req: Request, res: Response) {
    try {
      const { body } = req;
      const newExpense = await this.expenseService.createExpense(body);
      res.status(201).send({
        expense: newExpense
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: `SOMETHING WENT WRONG - UNABLE TO CREATE EXPENSE` });
    }
  }

  async getExpensies(req: Request, res: Response) {
    try {
      const expensies = await this.expenseService.getExpencies();
      res.status(200).send({
        expensies,
        tax: ExpenseRoutes.TAX
      });
    } catch (err) {
      res.status(500);
      throw err;
    }
  }

  async updateExpense(req: Request, res: Response) {
    try {
      const { body } = req;
      const updatedExpense = await this.expenseService.updateExpense(body);
      res.status(200).send({
        expense: updatedExpense,
        message: `succesfully updated expense with id ${updatedExpense._id}`
      });
    } catch (err) {
      res.status(500).send({
        message: `SOMETHING WENT WRONG - UNABLE TO UPDATE EXPENSE`
      });
    }
  }

  async deleteExpense(req: Request, res: Response) {
    try {
      const { expenseId } = req.params;
      const deletedExpense = await this.expenseService.deleteExpense(expenseId);
      res.status(200).json({
        expense: deletedExpense,
        message: 'succesfully deleted expense'
      });
    } catch (err) {
      res.status(500).send({
        message: `SOMETHING WENT WRONG - UNABLE TO DELETE EXPENSE`
      });
      throw err;
    }
  }
}
