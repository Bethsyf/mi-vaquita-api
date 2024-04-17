import db from '../database/database.js';
const GroupsServices = () => {
  const getGroups = () => {
    let groupDBSorted = [];

    groupDBSorted = db.toSorted(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return groupDBSorted.map((group) => ({
      name: group.name,
      color: group.color,
      id: group.id,
      createdAt: group.createdAt,
    }));
  };

  console.log(getGroups());

  const getGroupById = (id) => {
    const group = db.find((group) => group.id == id);
    return group;
  };

  const getGroupByName = (name) => {
    return db.find((group) => group.name === name);
  };

  const createGroup = (name, color) => {
    const existingGroup = getGroupByName(name);
    if (existingGroup) {
      return null;
    }
    const newGroup = {
      id: db.length + 1,
      name: name,
      color: color,
      createdAt: new Date().toISOString(),
    };
    db.push(newGroup);
    return newGroup;
  };

  const deleteGroupById = (id) => {
    const index = db.findIndex((group) => group.id === id);

    if (index !== -1) {
      db.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    getGroups,
    getGroupById,
    createGroup,
    getGroupByName,
    deleteGroupById,
  };
};

export { GroupsServices };
