const DB = require('../../db/inMemoryDb');

const getAll = async (boardId) => {
  const tasks = DB.tasks.filter((task) => task.boardId === boardId);
  return tasks;
};

const getById = async (boardId, id) => {
  const match = DB.tasks.find(
    (task) => task.boardId === boardId && task.id === id
  );
  if (!match) {
    // TODO: not found
  }
  return match;
};

const save = async (task) => {
  DB.tasks.push(task);
  return task;
};

const update = async (boardId, id, newTask) => {
  const match = DB.tasks.find(
    (task) => task.boardId === boardId && task.id === id
  );
  if (!match) {
    // TODO: method
  }
  match.title = newTask.title;
  match.order = newTask.order;
  match.description = newTask.description;
  match.userId = newTask.userId;
  match.boardId = newTask.boardId;
  match.columnId = newTask.columnId;
  return match;
};

const remove = async (boardId, id) => {
  const match = DB.tasks.findIndex(
    (task) => task.boardId === id && task.id === id
  );
  if (match === -1) {
    // TODO: not found
  }
  DB.tasks.splice(match, 1);
};

module.exports = { getAll, getById, save, update, remove };
