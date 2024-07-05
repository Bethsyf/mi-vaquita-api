import { ExpenseModel } from '../models/expense.model.js';

const db = ExpenseModel();

const ExpensesServices = () => {
  const create = async (expense) => {
    return await db.create(expense);
  };

  const getById = async (id) => {
    return await db.getById(id);
  };
  const getByNameAndGroupId = async (name, groupId) => {
    return await db.findByName(name, groupId);
  };

  const deleteById = async (id) => {
    return await db.deleteById(id);
  };

  return {
    create,
    getById,
    getByNameAndGroupId,
    deleteById,
  };
};

export { ExpensesServices };
