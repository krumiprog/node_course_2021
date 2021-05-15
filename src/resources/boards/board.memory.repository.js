const DB = require('../../db/inMemoryDb');

const getAll = async () => DB.boards;

const getById = async (id) => {
  const match = DB.boards.find((board) => board.id === id);
  return match;
};

const save = async (board) => {
  DB.boards.push(board);
  return board;
};

const update = async (id, newBoard) => {
  const match = DB.boards.find((board) => board.id === id);
  match.title = newBoard.title;
  match.columns = newBoard.columns;
  return match;
};

const remove = async (id) => {
  const match = DB.boards.findIndex((board) => board.id === id);

  if (match !== -1) {
    // console.log('BEFORE', DB.tasks);
    DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
    DB.boards.splice(match, 1);
    // console.log('AFTER', DB.tasks);
  }
  return match;
};

// const remove = async (id) => {
//   const match = DB.boards.findIndex((board) => board.id === id);
//   if (match !== -1) {
//     DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
//     DB.boards.splice(match, 1);
//   }
//   return match;
// };

module.exports = { getAll, getById, save, update, remove };
