// @ts-check
/** @module boards/service */

const boardsRepo = require('./board.memory.repository');

/**
 * Calling the get all board method of the board repository.
 */
const getAll = () => boardsRepo.getAll();

/**
 * Calling the get board by ID method of the board repository.
 * @param {string} id - A board ID.
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Calling the save board method of the board repository.
 * @param {Board} - A new board.
 */
const save = (board) => boardsRepo.save(board);

/**
 * Calling the update board method of the board repository.
 * @param {string} id - A board ID.
 * @param {Board} board - A new board.
 */
const update = (id, board) => boardsRepo.update(id, board);

/**
 * Calling the remove board method of the board repository.
 * @param {string} id - A board ID.
 */
const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, getById, save, update, remove };
