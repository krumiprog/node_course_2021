import DB from '../../db/inMemoryDb.js';
import Board from './board.model.js';

class BoardRepository {
  static async getAll(): Promise<Board[]> {
    return DB.boards;
  }

  static async getById(id: string): Promise<Board | undefined> {
    return await DB.boards.find((board) => board.id === id);
  }

  static async save(board: Board): Promise<Board> {
    await DB.boards.push(board);
    return board;
  }

  static async update(id: string, newBoard: Board): Promise<Board | undefined> {
    const match = await DB.boards.find((board) => board.id === id);

    if (match) {
      match.title = newBoard.title;
      match.columns = newBoard.columns;
    }

    return match;
  }

  static async remove(id: string): Promise<number> {
    const match = await DB.boards.findIndex((board) => board.id === id);

    if (match !== -1) {
      DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
      DB.boards.splice(match, 1);
    }

    return match;
  }
}

export default BoardRepository;
