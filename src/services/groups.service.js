import db from '../database/database.js';

const getGroups = (req, res) => {
  return db;
};
console.log(getGroups);

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

export default {
  getGroups,
  getGroupById,
  createGroup,
  getGroupByName,
  deleteGroupById,
};
