import { GroupModel } from '../models/group.model.js';

const db = GroupModel();

const GroupsServices = () => {
  const getAll = () => {
    let groupDBSorted = [];

    groupDBSorted = db.getAll();

    // .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return groupDBSorted;
  };

  const getById = async (id) => {
    const group = await db.getById(id);
    return group;
  };

  const getByName = async (name) => {
    return await db.findByName(name);
  };

  const create = async (name, color) => {
    const existingGroup = await getByName(name);
    if (existingGroup) {
      return null;
    }
    const newGroup = await db.create({
      ownerUserId: 1,
      name,
      color,
    });

    return newGroup;
  };

  const removeById = async (id) => {
    return await db.delete(id);
    // const index = db.findIndex((group) => group.id === id);

    // if (index !== -1) {
    //   db.splice(index, 1);
    //   return true;
    // }
    // return false;
  };

  return {
    getAll,
    getById,
    create,
    getByName,
    removeById,
  };
};

export { GroupsServices };
