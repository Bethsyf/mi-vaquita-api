import connectionPool from '../lib/connection.js';

const ExpenseModel = () => {
  const create = async (expense) => {
    const client = await connectionPool.connect();
    try {
      const parsedAmount = parseFloat(expense.amount);

      const result = await client.query(
        'INSERT INTO Expenses (groupId, userId, expenseName, amount, paidByUserId, participants) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          expense.groupId,
          expense.userId,
          expense.expenseName,
          parsedAmount,
          expense.paidByUserId,
          expense.participants,
        ]
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  };

  const getById = async (id) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM Expenses WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  };

  return {
    create,
    getById,
  };
};

export { ExpenseModel };
