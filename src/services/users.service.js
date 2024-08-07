import { UserModel } from '../models/user.model.js';

const db = UserModel();

const UsersServices = () => {
  const getAll = async () => {
    return await db.getAll();
  };

  const getAllByGroupId = async (groupId) => {
    return await db.getAllByGroupId(groupId);
  };

  const getById = async (id) => {
    return await db.getById(id);
  };

  const getByEmail = async (email) => {
    return await db.getByEmail(email);
  };

  const create = async (name, email, password) => {
    const existingUser = await getByEmail(email);
    if (existingUser) {
      return null;
    }
    const newUser = await db.create({
      ownerUserId: 1,
      name,
      email,
      password,
    });
    return newUser;
  };

  const update = async (id, updatedFields) => {
    return await db.update(id, updatedFields);
  };

  const removeById = async (id) => {
    return await db.removeById(id);
  };

  const updateById = async (id, userData) => {
    return await db.updateById(id, userData);
  };

  return {
    getAll,
    getAllByGroupId,
    getById,
    getByEmail,
    create,
    update,
    removeById,
    updateById,
  };
};

export default UsersServices;
