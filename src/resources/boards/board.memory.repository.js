// @ts-check
const DB = require('../../db/inMemoryDb');

/**
 * Get all boards from the Database.
 * @returns {Board[]}
 */
const getAll = async () => DB.boards;

/**
 * Get the board by ID from the Database.
 * @param {string} id - A board ID.
 * @returns {Board | undefined}
 */
const getById = async (id) => {
  const match = DB.boards.find((board) => board.id === id);
  return match;
};

/**
 * Save the new board to the Database.
 * @param {Board} board - A new board.
 * @returns {Board}
 */
const save = async (board) => {
  DB.boards.push(board);
  return board;
};

/**
 * Update the board to the Database.
 * @param {string} id - A board ID.
 * @param {Board} newBoard - A new board.
 * @returns {Board}
 */
const update = async (id, newBoard) => {
  const match = DB.boards.find((board) => board.id === id);
  match.title = newBoard.title;
  match.columns = newBoard.columns;
  return match;
};

/**
 * Remove the board from the Database.
 * @param {string} id - A board ID.
 * @returns {number}
 */
const remove = async (id) => {
  const match = DB.boards.findIndex((board) => board.id === id);

  if (match !== -1) {
    DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
    DB.boards.splice(match, 1);
  }
  return match;
};

module.exports = { getAll, getById, save, update, remove };
