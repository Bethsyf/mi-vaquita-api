import { ExpensesServices } from '../services/expenses.service.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const ExpenseController = () => {
  const expensesService = ExpensesServices();

  const create = async (req, res) => {
    try {
      if (!req.headers.authorization) {
        return res
          .status(401)
          .json({ error: 'Authorization header is missing' });
      }

      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.decode(token);

      if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'Invalid authorization token' });
      }

      const userId = decodedToken.id;

      await validateExpense(req.body);

      const { groupId, expenseName, amount, paidByUserId, participants } =
        req.body;

      const expenseData = {
        groupId,
        userId,
        expenseName,
        amount,
        paidByUserId,
        participants,
      };

      const expense = await expensesService.create(expenseData);

      return res
        .status(201)
        .json({ message: 'Expense created successfully', expense });
    } catch (error) {
      return handleError(res, error, 'Error adding expense');
    }
  };

  const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const expense = await expensesService.getById(id);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      return res.status(200).json(expense);
    } catch (error) {
      return handleError(res, error, 'Error fetching expense');
    }
  };

  const deleteById = async (req, res) => {
    try {
      const id = req.params.id;
      const expense = await expensesService.deleteById(id);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      return handleError(res, error, 'Error deleting expense');
    }
  };

  const validateExpense = async (expense) => {
    const schema = Joi.object({
      groupId: Joi.number().integer().required(),
      expenseName: Joi.string().max(100).required(),
      amount: Joi.number().positive().required(),
      paidByUserId: Joi.number().integer().required(),
      participants: Joi.array()
        .items(
          Joi.object({
            userId: Joi.number().integer().required(),
          })
        )
        .required(),
    });

    await schema.validateAsync(expense);

    const existingExpense = await expensesService.getByNameAndGroupId(
      expense.expenseName,
      expense.groupId
    );
    if (existingExpense) {
      throw new Error(
        'Expense with the same name already exists in this group'
      );
    }
  };

  const handleError = (res, error, message) => {
    console.error(message + ':', error.message);
    return res.status(500).json({ error: message + ': ' + error.message });
  };

  return {
    create,
    getById,
    deleteById,
  };
};

export { ExpenseController };
