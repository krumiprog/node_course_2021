// @ts-check
/** @module board/model */

const { v4: uuid } = require('uuid');

/**
 * @typedef Column
 * @type {object}
 * @property {string} id - An ID.
 * @property {string} title - A column title.
 * @property {number} order - A column order.
 */

/**
 * Class representing a Board.
 * @global
 */
class Board {
  /**
   * Create a board.
   * @param {object} board
   * @param {string} board.id
   * @param {string} board.title
   * @param {Column[]} board.columns
   */
  constructor({ id = uuid(), title, columns }) {
    /**
     * @property {string} id - An ID.
     */
    this.id = id;
    /**
     * @property {string} title - A board title.
     */
    this.title = title;
    /**
     * @property {Column[]} columns - An array of Column.
     */
    this.columns = columns;
  }
}

module.exports = Board;
