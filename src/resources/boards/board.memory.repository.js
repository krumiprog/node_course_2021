const DB = require('../../db/inMemoryDb');

const getAll = async () => DB.boards;

const getById = async (id) => {
  const match = DB.boards.find((board) => board.id === id);
  if (!match) {
    // TODO: not found
  }
  return match;
};

const save = async (board) => {
  DB.boards.push(board);
  return board;
};

const update = async (id, newBoard) => {
  const match = DB.boards.find((board) => board.id === id);
  if (!match) {
    // TODO: not found
  }
  match.title = newBoard.title;
  match.columns = newBoard.columns;
  return match;
};

const remove = async (id) => {
  const match = DB.boards.findIndex((user) => user.id === id);
  if (match !== -1) {
    // TODO: not found
  }
  DB.boards.splice(match, 1);
};

module.exports = { getAll, getById, save, update, remove };
