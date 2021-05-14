const DB = require('../../db/inMemoryDb');

const getAll = async () => DB.users;

const getById = async (id) => {
  const match = DB.users.find((user) => user.id === id);
  if (!match) {
    // TODO: not found
  }
  return match;
};

const save = async (user) => {
  DB.users.push(user);
  return user;
};

const update = async (id, newUser) => {
  const match = DB.users.find((user) => user.id === id);
  if (!match) {
    // TODO: not found
  }
  match.name = newUser.name;
  match.login = newUser.login;
  match.password = newUser.password;
  return match;
};

const remove = async (id) => {
  const match = DB.users.findIndex((user) => user.id === id);
  if (match !== -1) {
    // TODO: not found
  }
  DB.users.splice(match, 1);
  // DB.users = DB.users.filter((user) => user.id !== id);
};

module.exports = { getAll, getById, save, update, remove };
