// @ts-check
/** @module boards/repository */

const DB = require('../../db/inMemoryDb');

/**
 * Get all boards from the Database.
 * @returns {Promise<Board[]>} An array of boards.
 */
const getAll = async () => DB.boards;

/**
 * Get the board by ID from the Database.
 * @param {string} id - A board ID.
 * @returns {Promise<Board | undefined>} A board.
 */
const getById = async (id) => {
  const match = await DB.boards.find((board) => board.id === id);
  return match;
};

/**
 * Save the new board to the Database.
 * @param {Board} board - A new board.
 * @returns {Promise<Board>} A new board.
 */
const save = async (board) => {
  await DB.boards.push(board);
  return board;
};

/**
 * Update the board to the Database.
 * @param {string} id - A board ID.
 * @param {Board} newBoard - A new board.
 * @returns {Promise<Board>} An updated board.
 */
const update = async (id, newBoard) => {
  const match = await DB.boards.find((board) => board.id === id);
  match.title = newBoard.title;
  match.columns = newBoard.columns;
  return match;
};

/**
 * Remove the board from the Database.
 * @param {string} id - A board ID.
 * @returns {Promise<number>} An index of a removed board.
 */
const remove = async (id) => {
  const match = await DB.boards.findIndex((board) => board.id === id);

  if (match !== -1) {
    DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
    DB.boards.splice(match, 1);
  }
  return match;
};

module.exports = { getAll, getById, save, update, remove };
