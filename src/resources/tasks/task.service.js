const taskRepo = require('./task.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);

const getById = (boardId, id) => taskRepo.getById(boardId, id);

const save = (task) => taskRepo.save(task);

const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, getById, save, update, remove };
