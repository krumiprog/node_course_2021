// @ts-check
const DB = require('../../db/inMemoryDb');

/**
 * Get all users from the Database.
 * @returns {User[]} An array of users.
 */
const getAll = async () => DB.users;

/**
 * Get the user by ID from the Database.
 * @param {string} id - A user ID.
 * @returns {User} A user.
 */
const getById = async (id) => {
  const match = DB.users.find((user) => user.id === id);
  return match;
};

/**
 * Save the new user to the Database.
 * @param {User} user - A new user.
 * @returns {User} A new user.
 */
const save = async (user) => {
  DB.users.push(user);
  return user;
};

/**
 * Update the board to the Database.
 * @param {string} id - A user ID.
 * @param {User} newUser - A new user.
 * @returns {User} An updated user.
 */
const update = async (id, newUser) => {
  const match = DB.users.find((user) => user.id === id);
  match.name = newUser.name;
  match.login = newUser.login;
  match.password = newUser.password;
  return match;
};

/**
 * Remove the user from the Database.
 * @param {string} id - A user ID.
 */
const remove = async (id) => {
  const match = DB.users.findIndex((user) => user.id === id);
  DB.users.splice(match, 1);

  DB.tasks = DB.tasks.map((task) => {
    if (task.userId === id) {
      return { ...task, userId: null };
    }
    return task;
  });
};

module.exports = { getAll, getById, save, update, remove };
