/**
 * Database.
 * @typedef {Object} Database
 * @property {User[]} users - An array of users.
 * @property {Board[]} boards - An array of boards.
 * @property {Task[]} tasks - An array of tasks.
 */

/**
 * @type {Database}
 */
const db = {
  users: [],
  boards: [],
  tasks: [],
};

module.exports = db;
