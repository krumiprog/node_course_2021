const DB = require('../../db/inMemoryDb');

const getAll = async (boardId) =>
  DB.tasks.filter((task) => task.boardId === boardId);

const getById = async (boardId, id) => DB.tasks.find((task) => task.id === id);

const save = async (task) => {
  DB.tasks.push(task);
  return task;
};

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

const remove = async (boardId, id) => {
  const match = DB.tasks.findIndex((task) => task.id === id);
  if (match !== -1) {
    DB.tasks.splice(match, 1);
  }
  return match;
};

module.exports = { getAll, getById, save, update, remove };
