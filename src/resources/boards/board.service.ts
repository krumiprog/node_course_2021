import BoardRepository from './board.memory.repository.js';
import Board from './board.model.js';

class BoardService {
  static getAll(): Board[] {
    return BoardRepository.getAll();
  }

  static getById(id: string): Board | undefined {
    return BoardRepository.getById(id);
  }

  static save(board: Board): Board {
    return BoardRepository.save(board);
  }

  static update(id: string, board: Board): Board | undefined {
    return BoardRepository.update(id, board);
  }

  static remove(id: string): number {
    return BoardRepository.remove(id);
  }
}

export default BoardService;
