import { DeleteResult } from 'typeorm';
import boardRepository from './board.repository';
import { Board } from '../entities/board';
import { IColumn } from '../../types/types';

class BoardService {
  async getAll(): Promise<Board[]> {
    return boardRepository.getAll();
  }

  async getById(id: string): Promise<Board | undefined> {
    return boardRepository.getById(id);
  }

  async save(title: string, columns: IColumn[]): Promise<Board> {
    return boardRepository.save(title, columns);
  }

  async update(
    id: string,
    title: string,
    columns: IColumn[]
  ): Promise<Board | undefined> {
    return boardRepository.update(id, title, columns);
  }

  async remove(id: string): Promise<DeleteResult> {
    return boardRepository.remove(id);
  }
}

export default new BoardService();
