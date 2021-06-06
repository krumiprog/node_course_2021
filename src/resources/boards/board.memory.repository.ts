import DB from '../../db/inMemoryDb';
import Board from './board.model';

class BoardRepository {
  static getAll(): Board[] {
    return DB.boards;
  }

  static getById(id: string): Board | undefined {
    return DB.boards.find((board) => board.id === id);
  }

  static save(board: Board): Board {
    DB.boards.push(board);
    return board;
  }

  static update(id: string, newBoard: Board): Board | undefined {
    const match = DB.boards.find((board) => board.id === id);

    if (match) {
      match.title = newBoard.title;
      match.columns = newBoard.columns;
    }

    return match;
  }

  static remove(id: string): number {
    const match = DB.boards.findIndex((board) => board.id === id);

    if (match !== -1) {
      DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
      DB.boards.splice(match, 1);
    }

    return match;
  }
}

export default BoardRepository;
