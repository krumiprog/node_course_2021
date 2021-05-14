const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const save = (board) => boardsRepo.save(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, getById, save, update, remove };
