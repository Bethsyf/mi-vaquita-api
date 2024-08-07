import connectionPool from '../lib/connection.js';
import bcrypt from 'bcryptjs';

const UserModel = () => {
  const getAll = async () => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query('SELECT * FROM Users');
      return result.rows;
    } finally {
      client.release();
    }
  };

  const getAllByGroupId = async (groupId) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        `
        SELECT * FROM Users WHERE id NOT IN (
          SELECT userId FROM GroupMembers
          WHERE groupId = $1
          UNION
          SELECT ownerUserId FROM Groups
          WHERE id = $1
        );
      `,
        [groupId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  };

  const create = async (user) => {
    const client = await connectionPool.connect();
    user.password = await bcrypt.hash(user.password, 10);
    const { name, email, password } = user;
    const createdAt = new Date().toISOString();
    const result = await client.query(
      'INSERT INTO Users (name, email, password, createdat) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, createdAt]
    );
    client.release();
    return result.rows[0];
  };

  const getById = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM Users WHERE id = $1', [
      id,
    ]);
    client.release();
    return result.rows[0];
  };

  const getByEmail = async (email) => {
    const client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM Users WHERE email = $1', [
      email,
    ]);
    client.release();
    return result.rows[0];
  };

  const removeById = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('DELETE FROM Users WHERE ID = $1', [id]);
    client.release();
    return result.rowCount >= 1;
  };

  const updateById = async (id, user) => {
    const client = await connectionPool.connect();
    try {
      const { name, email, password } = user;
      let updatedFields = [];
      let values = [];
      let index = 1;

      if (name) {
        updatedFields.push(`name = $${index}`);
        values.push(name);
        index++;
      }
      if (email) {
        updatedFields.push(`email = $${index}`);
        values.push(email);
        index++;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFields.push(`password = $${index}`);
        values.push(hashedPassword);
        index++;
      }

      values.push(id);
      const result = await client.query(
        `UPDATE Users SET ${updatedFields.join(
          ', '
        )} WHERE id = $${index} RETURNING *`,
        values
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  };

  return {
    getAll,
    getAllByGroupId,
    create,
    getById,
    getByEmail,
    removeById,
    updateById,
  };
};

export { UserModel };
