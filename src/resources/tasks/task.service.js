// @ts-check
const taskRepo = require('./task.memory.repository');

/**
 * Calling the get all tasks method of the task repository.
 * @param {string} boardId - A board ID.
 */
const getAll = (boardId) => taskRepo.getAll(boardId);

/**
 * Calling the get by ID method of the task repository.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 */
const getById = (boardId, id) => taskRepo.getById(boardId, id);

/**
 * Calling the save task method of the task repository.
 * @param {Task} task - A new Task.
 */
const save = (task) => taskRepo.save(task);

/**
 * Calling the update task method of the task repository.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 * @param {Task} task - A new task.
 */
const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

/**
 * Calling the remove task method of the task repository.
 * @param {string} boardId - A board ID.
 * @param {string} id - A task ID.
 */
const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, getById, save, update, remove };
