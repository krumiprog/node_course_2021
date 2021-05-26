// @ts-check
/** @module tasks/repository */

const DB = require('../../db/inMemoryDb');

/**
 * Get all tasks by board ID from the Database.
 * @param {string} boardId - A board ID.
 * @returns {Promise<Task[]>} An array of tasks.
 */
const getAll = async (boardId) =>
  DB.tasks.filter((task) => task.boardId === boardId);

/**
 * Get the task by ID from the Database.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 * @returns {Promise<Task | undefined>} A task.
 */
const getById = async (boardId, id) => DB.tasks.find((task) => task.id === id);

/**
 * Save the new task to the Database.
 * @param {Task} task - A new task.
 * @returns {Promise<Task>} A new task.
 */
const save = async (task) => {
  await DB.tasks.push(task);
  return task;
};

/**
 * Update the task to the Database.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 * @param {Task} newTask - A new task.
 * @returns {Promise<Task>} An updated task.
 */
const update = async (boardId, id, newTask) => {
  const match = await DB.tasks.find(
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
 * @returns {Promise<number>} A index of a removed task.
 */
const remove = async (boardId, id) => {
  const match = await DB.tasks.findIndex((task) => task.id === id);
  if (match !== -1) {
    DB.tasks.splice(match, 1);
  }
  return match;
};

module.exports = { getAll, getById, save, update, remove };
