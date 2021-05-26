const DB = require('../../db/inMemoryDb');

/**
 * Get all tasks by board ID from the Database.
 * @param {string} boardId - A board ID.
 * @returns {Task[]}
 */
const getAll = async (boardId) =>
  DB.tasks.filter((task) => task.boardId === boardId);

/**
 * Get the task by ID from the Database.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 * @returns {Task | undefined}
 */
const getById = async (boardId, id) => DB.tasks.find((task) => task.id === id);

/**
 * Save the new task to the Database.
 * @param {Task} task - A new task.
 * @returns {Task}
 */
const save = async (task) => {
  DB.tasks.push(task);
  return task;
};

/**
 * Update the task to the Database.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 * @param {Task} newTask - A new task.
 * @returns {Task}
 */
const update = async (boardId, id, newTask) => {
  const match = DB.tasks.find(
    (task) => task.boardId === boardId && task.id === id
  );
  match.title = newTask.title;
  match.order = newTask.order;
  match.description = newTask.description;
  match.userId = newTask.userId;
  match.boardId = newTask.boardId;
  match.columnId = newTask.columnId;
  return match;
};

/**
 * Remove the task from the Database.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 * @returns {number}
 */
const remove = async (boardId, id) => {
  const match = DB.tasks.findIndex((task) => task.id === id);
  if (match !== -1) {
    DB.tasks.splice(match, 1);
  }
  return match;
};

module.exports = { getAll, getById, save, update, remove };
