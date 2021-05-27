import BoardRepository from './board.memory.repository.js';
import Board from './board.model.js';

class BoardService {
  static async getAll() {
    return BoardRepository.getAll();
  }

  static async getById(id: string) {
    return BoardRepository.getById(id);
  }

  static async save(board: Board) {
    return BoardRepository.save(board);
  }

  static async update(id: string, board: Board) {
    return BoardRepository.update(id, board);
  }

  static async remove(id: string) {
    return BoardRepository.remove(id);
  }
}

export default BoardService;
