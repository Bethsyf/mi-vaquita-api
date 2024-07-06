import connectionPool from '../lib/connection.js';

const ExpenseModel = () => {
  const create = async (expenseData) => {
    const client = await connectionPool.connect();
    try {
      const parsedAmount = parseFloat(expenseData.amount);

      const result = await client.query(
        'INSERT INTO Expenses (groupId, userId, expenseName, amount, paidByUserId, participants) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          expenseData.groupId,
          expenseData.userId,
          expenseData.expenseName,
          parsedAmount,
          expenseData.paidByUserId,
          JSON.stringify(expenseData.participants),
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

  const getByUserId = async (userId) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT e.*, g.name AS groupname FROM Expenses e JOIN Groups g ON e.groupId = g.id WHERE e.userId = $1',
        [userId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  };

  const findByName = async (expenseName, groupId) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM Expenses WHERE expenseName = $1 AND groupId = $2',
        [expenseName, groupId]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  };

  const deleteById = async (id) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'DELETE FROM Expenses WHERE id = $1 RETURNING *',
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
    getByUserId,
    findByName,
    deleteById,
  };
};

export { ExpenseModel };
