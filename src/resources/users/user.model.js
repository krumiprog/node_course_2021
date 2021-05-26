const { v4: uuid } = require('uuid');

/**
 * Class representing a User.
 */
class User {
  /**
   * Create a user.
   * @param {object} user
   * @param {string} board.id
   * @param {string} board.name
   * @param {string} board.login
   * @param {string} board.password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    /**
     * @property {string} id - An ID.
     */
    this.id = id;
    /**
     * @property {string} name - Username.
     */
    this.name = name;
    /**
     * @property {string} login - Login.
     */
    this.login = login;
    /**
     * @property {string} password - Password.
     */
    this.password = password;
  }

  /**
   * Filtering user data.
   * @param {User} user - User object.
   * @returns {{id: string, name: string, login: string}} Filtered user data.
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
