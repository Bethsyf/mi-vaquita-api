import connectionPool from '../lib/connection.js';

const GroupModel = () => {
  const getAll = async (userId) => {
    const client = await connectionPool.connect();
    try {
      const query = `
        SELECT id, name, color, createdat
        FROM (
          SELECT id, name, color, createdat
          FROM Groups
          WHERE ownerUserId = $1
          
          UNION
          
          SELECT G.id, G.name, G.color, G.createdat
          FROM Groups G
          JOIN GroupMembers GM ON G.id = GM.groupId
          WHERE GM.userId = $1
        ) AS combined_results
        ORDER BY createdat DESC, id DESC`;

      const result = await client.query(query, [userId]);
      return result.rows;
    } finally {
      client.release();
    }
  };

  const getById = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM GROUPS WHERE ID = $1', [
      id,
    ]);
    client.release();
    return result.rows[0];
  };

  const getCountParticipants = async (id) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        `
        SELECT COUNT(*) AS count FROM Users WHERE id IN (
          SELECT ownerUserId FROM Groups WHERE id = $1
          UNION
          SELECT userId FROM GroupMembers WHERE groupId = $1
        );
        `,
        [id]
      );
      return result.rows[0].count;
    } finally {
      client.release();
    }
  };

  const getExpensesById = async (id) => {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        `SELECT
          e.id,
          e.expensename AS expenseName,
          u.name AS paidBy,
          e.amount AS amount,
          e.participants AS participants
        FROM expenses e
        JOIN users u ON e.paidbyuserid = u.id
        WHERE e.groupid = $1`,
        [id]
      );

      // Transformar los resultados para agregar participantsCount
      const expenses = result.rows.map((row) => {
        const participants = row.participants || [];
        const participantsCount = participants.length;
        return {
          id: row.id,
          expenseName: row.expensename,
          paidBy: row.paidby,
          amount: parseFloat(row.amount),
          participants,
          participantsCount,
        };
      });

      return expenses;
    } finally {
      client.release();
    }
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
    try {
      const result = await client.query(
        'INSERT INTO GROUPS (owneruserid, name, color, createdat) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [entity.ownerUserId, entity.name, entity.color]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
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

  const removeById = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('DELETE FROM GROUPS WHERE ID = $1', [id]);
    client.release();
    return result.rowCount >= 1;
  };

  const addMember = async (groupId, userEmails) => {
    const client = await connectionPool.connect();
    try {
      await client.query('BEGIN');

      for (const email of userEmails) {
        const userResult = await client.query(
          'SELECT id FROM USERS WHERE email = $1',
          [email]
        );
        if (userResult.rows.length === 0) {
          throw new Error(`Usuario con email ${email} no encontrado`);
        }
        const userId = userResult.rows[0].id;

        await addMemberToGroup(groupId, userId);
      }

      await client.query('COMMIT');

      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };

  const addMemberToGroup = async (groupId, userId) => {
    const client = await connectionPool.connect();
    try {
      await client.query(
        'INSERT INTO GroupMembers (groupId, userId) VALUES ($1, $2)',
        [groupId, userId]
      );
    } finally {
      client.release();
    }
  };

  const removeMember = async (groupId, userId) => {
    const client = await connectionPool.connect();
    try {
      await client.query('BEGIN');

      const removeMemberQuery =
        'DELETE FROM GROUPMEMBERS WHERE group_id = $1 AND user_id = $2';
      const result = await client.query(removeMemberQuery, [groupId, userId]);

      await client.query('COMMIT');

      return result.rowCount >= 1;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };

  return {
    getById,
    getAll,
    getCountParticipants,
    getExpensesById,
    create,
    update,
    removeById,
    findByName,
    addMember,
    removeMember,
  };
};

export { GroupModel };
