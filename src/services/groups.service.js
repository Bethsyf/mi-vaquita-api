import { GroupModel } from '../models/group.model.js';

const db = GroupModel();

const GroupsServices = () => {
  const getAll = async () => {
    return await db.getAll();
  };

  const getById = async (id) => {
    return await db.getById(id);
  };

  const getByName = async (name) => {
    return await db.findByName(name);
  };

  const create = async (userId, name, color) => {
    if (!userId) {
      throw new Error('OwnerUserId cannot be null or undefined');
    }

    const existingGroup = await getByName(name);
    if (existingGroup) {
      return null;
    }
    const newGroup = await db.create({
      ownerUserId: userId,
      name,
      color,
    });
    return newGroup;
  };

  const update = async (id, updatedFields) => {
    return await db.update(id, updatedFields);
  };

  const removeById = async (id) => {
    return await db.delete(id);
  };

  return {
    getAll,
    getById,
    create,
    update,
    getByName,
    removeById,
  };
};

export { GroupsServices };
