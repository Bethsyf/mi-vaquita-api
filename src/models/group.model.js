import connectionPool from '../lib/connection.js';

const GroupModel = () => {
  const getAll = async () => {
    const client = await connectionPool.connect();
    const result = await client.query(
      'SELECT * FROM GROUPS ORDER BY createdat DESC'
    );
    client.release();
    return result.rows;
  };

  const getById = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM GROUPS WHERE ID = $1', [
      id,
    ]);
    client.release();
    return result.rows[0];
  };

  const findByName = async (value) => {
    const client = await connectionPool.connect();
    const result = await client.query(
      'SELECT COUNT(*) FROM GROUPS WHERE NAME = $1',
      [value]
    );
    client.release();
    return result.rows[0].count > 0;
  };

  const create = async (entity) => {
    const client = await connectionPool.connect();
    const result = await client.query(
      'INSERT INTO GROUPS (owneruserid, name, color, CREATEDAT) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [entity.ownerUserId, entity.name, entity.color]
    );
    client.release();
    return result.rows[0];
  };

  const update = async (id, updatedFields) => {
    const client = await connectionPool.connect();
    const setClause = Object.keys(updatedFields)
      .map((key, idx) => `${key} = $${idx + 2}`)
      .join(', ');
    const values = [id, ...Object.values(updatedFields)];
    const result = await client.query(
      `UPDATE GROUPS SET ${setClause} WHERE ID = $1 RETURNING *`,
      values
    );
    client.release();
    return result.rows[0];
  };

  const del = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('DELETE FROM GROUPS WHERE ID = $1', [id]);
    client.release();
    return result.rowCount >= 1;
  };

  return {
    getById,
    getAll,
    create,
    update,
    delete: del,
    findByName,
  };
};

export { GroupModel };
