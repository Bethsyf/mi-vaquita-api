import express from 'express';
import { ExpenseController } from '../controller/expenses.controller.js';

const ExpenseRouter = () => {
  const expenseController = ExpenseController();
  const router = express.Router();

  router.post('/', expenseController.create);
  router.get('/:id', expenseController.getById);

  return router;
};

export { ExpenseRouter };
