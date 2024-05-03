import database from '../database/database.js';

const db = database.users;

const UsersServices = () => {
  const getAll = () => {
    let userDBSorted = [];

    userDBSorted = db.toSorted(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return userDBSorted.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    }));
  };

  const getById = (id) => {
    const user = db.find((user) => user.id == id);
    return user;
  };

  const getByName = (name) => {
    return db.find((user) => user.name === name);
  };

  const create = (name, email, password) => {
    const existingUser = getByName(name);
    if (existingUser) {
      return null;
    }
    const newUser = {
      id: db.length + 1,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    db.push(newUser);
    return newUser;
  };

  const removeById = (id) => {
    const index = db.findIndex((user) => user.id === id);

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

export { UsersServices };
