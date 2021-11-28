"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
require("jest");
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const Typemoq = __importStar(require("typemoq"));
const expense_service_1 = require("./expense-service");
chai_1.default.use(sinon_chai_1.default);
chai_1.default.use(chai_as_promised_1.default);
describe(expense_service_1.ExpenseService.name, () => {
    let expenseDao;
    let expenseService;
    const mockObjectId = '56cb91bdc3464f14678934ca';
    beforeAll(() => {
        expenseDao = Typemoq.Mock.ofType();
        expenseService = new expense_service_1.ExpenseService(expenseDao.object);
    });
    afterAll(() => {
        expenseDao.verifyAll();
        sinon_1.default.restore();
    });
    describe('Mock query all expensies', () => {
        test('Get all the expenses', () => {
            expenseDao
                .setup((mock) => mock.getExpencies())
                .returns(async () => [])
                .verifiable(Typemoq.Times.once());
            const promise = expenseService.getExpencies();
            return (0, chai_1.expect)(promise).to.be.eventually.be.fulfilled;
        });
    });
    describe('Mock creation of an expense', () => {
        test('succesfully create an expense', () => {
            const newExpense = {
                amount: 50,
                description: 'gas refil at petro canada',
                date: new Date()
            };
            expenseDao
                .setup((mock) => mock.createExpense(newExpense))
                .returns(async () => newExpense)
                .verifiable(Typemoq.Times.once());
            const promise = expenseService.createExpense(newExpense);
            return (0, chai_1.expect)(promise).to.be.eventually.be.fulfilled;
        });
    });
    describe('Mock update of an expense', () => {
        test('succesfully update an expense', () => {
            const expenseToUpdate = {
                amount: 100,
                description: 'gas refil at petro canada',
                date: new Date(),
                _id: mockObjectId
            };
            expenseDao
                .setup((mock) => mock.updateExpense(expenseToUpdate))
                .returns(async () => expenseToUpdate)
                .verifiable(Typemoq.Times.once());
            const promise = expenseService.updateExpense(expenseToUpdate);
            return (0, chai_1.expect)(promise).to.be.eventually.be.fulfilled;
        });
    });
    describe('Mock delete of an expense', () => {
        test('succesfully update an expense', () => {
            const expenseToDelete = {
                amount: 100,
                description: 'gas refil at petro canada',
                date: new Date(),
                _id: mockObjectId
            };
            expenseDao
                .setup((mock) => mock.deleteExpense(expenseToDelete._id))
                .returns(async () => expenseToDelete)
                .verifiable(Typemoq.Times.once());
            const promise = expenseService.deleteExpense(expenseToDelete._id);
            return (0, chai_1.expect)(promise).to.be.eventually.be.fulfilled;
        });
    });
});
