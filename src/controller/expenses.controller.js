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

      // Validar los datos de la solicitud usando validateExpense
      await validateExpense(req.body);

      // Extraer los datos del cuerpo de la solicitud
      const { groupId, expenseName, amount, paidByUserId, participants } =
        req.body;

      // Calcular participantsCount
      const participantsCount = participants.length;

      // Crear el objeto de gasto con los datos necesarios
      const expenseData = {
        groupId,
        userId,
        expenseName,
        amount,
        paidByUserId,
        participants,
        participantsCount, // Añadir participantsCount al objeto de gasto
      };

      // Llamar al servicio para crear el gasto, pasando los datos completos
      const expense = await expensesService.create(expenseData);

      // Añadir participantsCount a la respuesta del gasto
      expense.participantsCount = participantsCount;

      // Devolver la respuesta con el gasto creado y un mensaje
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
            participated: Joi.boolean().required(),
          })
        )
        .required(),
    });

    await schema.validateAsync(expense);
  };

  const handleError = (res, error, message) => {
    console.error(message + ':', error.message);
    return res.status(500).json({ error: message + ': ' + error.message });
  };

  return {
    create,
    getById,
  };
};

export { ExpenseController };
