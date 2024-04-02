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

const createGroups = (name) => {
  const existingGroup = getGroupByName(name);
  if (existingGroup) {
    return null;
  }
  const newGroup = {
    id: db.length + 1,
    name: name,
    color: 'white',
  };
  db.push(newGroup);
  return newGroup;
};

export default { getGroups, getGroupById, createGroups, getGroupByName };
