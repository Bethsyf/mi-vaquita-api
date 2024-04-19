import database from '../database/database.js';

const db = database.groups;

const GroupsServices = () => {
  const getAll = () => {
    let groupDBSorted = [];

    groupDBSorted = db.toSorted(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return groupDBSorted.map((group) => ({
      id: group.id,
      name: group.name,
      color: group.color,
      createdAt: group.createdAt,
    }));
  };

  const getById = (id) => {
    const group = db.find((group) => group.id == id);
    return group;
  };

  const getByName = (name) => {
    return db.find((group) => group.name === name);
  };

  const create = (name, color) => {
    const existingGroup = getByName(name);
    if (existingGroup) {
      return null;
    }
    const newGroup = {
      id: db.length + 1,
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    db.push(newGroup);
    return newGroup;
  };

  const removeById = (id) => {
    const index = db.findIndex((group) => group.id === id);

    if (index !== -1) {
      db.splice(index, 1);
      return true;
    }
    return false;
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
