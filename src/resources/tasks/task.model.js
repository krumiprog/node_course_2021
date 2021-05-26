// @ts-check
const { v4: uuid } = require('uuid');

/**
 * Class representing a Task.
 */
class Task {
  /**
   * Create a task.
   * @param {object} task
   * @param {string} task.id
   * @param {string} task.title
   * @param {string} task.order
   * @param {string} task.description
   * @param {string} task.userId
   * @param {string} task.boardId
   * @param {string} task.columnId
   */
  constructor({
    id = uuid(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }) {
    /**
     * @property {string} id - An ID.
     */
    this.id = id;
    /**
     * @property {string} title - A task title.
     */
    this.title = title;
    /**
     * @property {string} order - A task order.
     */
    this.order = order;
    /**
     * @property {string} description - A task description.
     */
    this.description = description;
    /**
     * @property {string} userId - A task user ID.
     */
    this.userId = userId;
    /**
     * @property {string} boardId - A task board ID.
     */
    this.boardId = boardId;
    /**
     * @property {string} columnId - A task column ID.
     */
    this.columnId = columnId;
  }
}

module.exports = Task;
