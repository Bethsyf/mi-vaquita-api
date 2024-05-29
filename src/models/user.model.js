import connectionPool from '../lib/connection.js';
import bcrypt from 'bcryptjs';

const UserModel = () => {
  const getAll = async () => {
    const client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM USERS');
    client.release();
    return result.rows;
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

  return {
    getAll,
    create,
    getById,
    getByEmail,
  };
};

export { UserModel };