// @ts-check
/**  @module users/service */

const usersRepo = require('./user.memory.repository');

/**
 * Calling the get all users method of the users repository.
 */
const getAll = () => usersRepo.getAll();

/**
 * Calling the get user by ID method of the user repository.
 * @param {string} id - A user ID.
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Calling the save user method of the user repository.
 * @param {User} user - A new user.
 */
const save = (user) => usersRepo.save(user);

/**
 * Calling the update board method of the board repository.
 * @param {string} id - A user ID.
 * @param {User} user - A new user.
 */
const update = (id, user) => usersRepo.update(id, user);

/**
 * Calling the remove user method of the user repository.
 * @param {user} id - A user ID.
 */
const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, getById, save, update, remove };
