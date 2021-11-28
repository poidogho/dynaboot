"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_validator_1 = require("express-validator");
class ExpenseRoutes {
    constructor(expenseService, router) {
        this.expenseService = expenseService;
        this.router = router;
    }
    initialize(server) {
        this.router.post('/expenses/', [
            (0, express_validator_1.check)('description', 'Description is required').not().isEmpty(),
            (0, express_validator_1.check)('amount', 'Amount is Required').not().isEmpty(),
            (0, express_validator_1.check)('date', 'Date is Required').not().isEmpty()
        ], (req, res) => this.createExpense(req, res));
        this.router.get('/expenses/', (req, res) => this.getExpensies(req, res));
        this.router.patch('/expenses/:expenseId', [
            (0, express_validator_1.check)('description', 'Description is required').not().isEmpty(),
            (0, express_validator_1.check)('amount', 'Amount is Required').not().isEmpty(),
            (0, express_validator_1.check)('date', 'Date is Required').not().isEmpty()
        ], (req, res) => this.updateExpense(req, res));
        this.router.delete('/expenses/:expenseId', (req, res) => this.deleteExpense(req, res));
        server.use('/api', this.router);
    }
    async createExpense(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    errors: errors.array()
                });
            }
            const { body } = req;
            const newExpense = await this.expenseService.createExpense(body);
            res.status(201).send({
                expense: newExpense
            });
        }
        catch (err) {
            res
                .status(500)
                .send({ message: `SOMETHING WENT WRONG - UNABLE TO CREATE EXPENSE` });
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async getExpensies(req, res) {
        try {
            const expensies = await this.expenseService.getExpencies();
            res.status(200).send({
                expensies,
                tax: ExpenseRoutes.TAX
            });
        }
        catch (err) {
            res.status(500);
            throw err;
        }
    }
    async updateExpense(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    errors: errors.array()
                });
            }
            const { body } = req;
            const updatedExpense = await this.expenseService.updateExpense(body);
            res.status(200).send({
                expense: updatedExpense,
                message: `succesfully updated expense with id ${updatedExpense._id}`
            });
        }
        catch (err) {
            res.status(500).send({
                message: `SOMETHING WENT WRONG - UNABLE TO UPDATE EXPENSE`
            });
        }
    }
    async deleteExpense(req, res) {
        try {
            const { expenseId } = req.params;
            if (!expenseId) {
                return res.send(400).send({
                    message: 'No Expense ID provided'
                });
            }
            const deletedExpense = await this.expenseService.deleteExpense(expenseId);
            res.status(200).json({
                expense: deletedExpense,
                message: 'succesfully deleted expense'
            });
        }
        catch (err) {
            res.status(500).send({
                message: `SOMETHING WENT WRONG - UNABLE TO DELETE EXPENSE`
            });
            throw err;
        }
    }
}
exports.ExpenseRoutes = ExpenseRoutes;
ExpenseRoutes.TAX = 15;
