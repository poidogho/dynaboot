import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'jest';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as Typemoq from 'typemoq';
import { ExpenseDao } from '../dao/expense-dao';
import { ExpenseService } from './expense-service';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe(ExpenseService.name, () => {
  let expenseDao: Typemoq.IMock<ExpenseDao>;
  let expenseService: ExpenseService;

  const mockObjectId = '56cb91bdc3464f14678934ca';

  beforeAll(() => {
    expenseDao = Typemoq.Mock.ofType<ExpenseDao>();
    expenseService = new ExpenseService(expenseDao.object);
  });

  afterAll(() => {
    expenseDao.verifyAll();
    sinon.restore();
  });

  describe('Mock query all expensies', () => {
    test('Get all the expenses', () => {
      expenseDao
        .setup((mock) => mock.getExpencies())
        .returns(async () => [])
        .verifiable(Typemoq.Times.once());

      const promise = expenseService.getExpencies();

      return expect(promise).to.be.eventually.be.fulfilled;
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

      return expect(promise).to.be.eventually.be.fulfilled;
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

      return expect(promise).to.be.eventually.be.fulfilled;
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

      return expect(promise).to.be.eventually.be.fulfilled;
    });
  });
});
