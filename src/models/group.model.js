import connectionPool from '../lib/connection.js';

const GroupModel = () => {
  // const getAll = async () => {
  //   const client = await connectionPool.connect();
  //   const result = await client.query(
  //     'SELECT * FROM GROUPS ORDER BY createdat DESC'
  //   );
  //   client.release();
  //   return result.rows;
  // };
  const getAll = async (userId) => {
    const client = await connectionPool.connect();
    try {
      const query = `
        SELECT G.id, G.name, G.color
        FROM Groups G
        WHERE G.ownerUserId = $1 
        
        UNION 
        
        SELECT G.id, G.name, G.color
        FROM Groups G
        JOIN GroupMembers GM ON G.id = GM.groupId
        WHERE GM.userId = $1
      `;
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

  const removeById = async (id) => {
    const client = await connectionPool.connect();
    const result = await client.query('DELETE FROM GROUPS WHERE ID = $1', [id]);
    client.release();
    return result.rowCount >= 1;
  };

  const addMember = async (groupId, userId) => {
    const client = await connectionPool.connect();
    try {
      await client.query('BEGIN');

      // Primero, verifica si el usuario ya es miembro del grupo
      const checkMemberQuery =
        'SELECT COUNT(*) FROM GROUPMEMBERS WHERE groupId = $1 AND userId = $2';
      const checkMemberResult = await client.query(checkMemberQuery, [
        groupId,
        userId,
      ]);

      if (checkMemberResult.rows[0].count > 0) {
        throw new Error('User is already a member of the group');
      }

      // Si el usuario no es miembro, añádelo a la tabla GROUP_MEMBERS
      const addMemberQuery =
        'INSERT INTO GROUPMEMBERS (groupId, userId) VALUES ($1, $2)';
      await client.query(addMemberQuery, [groupId, userId]);

      await client.query('COMMIT');

      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };

  const removeMember = async (groupId, userId) => {
    const client = await connectionPool.connect();
    try {
      await client.query('BEGIN');

      // Elimina al usuario de la tabla GROUP_MEMBERS
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
    create,
    update,
    removeById,
    findByName,
    addMember,
    removeMember,
  };
};

export { GroupModel };
