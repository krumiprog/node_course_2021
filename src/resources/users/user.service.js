const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const save = (user) => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, getById, save, update, remove };
