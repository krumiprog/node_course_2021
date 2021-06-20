import { DeleteResult, getRepository } from 'typeorm';
import { Board } from '../entities/board';
import { IColumn } from '../../types/types';

class BoardRepository {
  async getAll(): Promise<Board[]> {
    return getRepository(Board).find();
  }

  async getById(id: string): Promise<Board | undefined> {
    return getRepository(Board).findOne(id);
  }

  async save(title: string, columns: IColumn[]): Promise<Board> {
    const newBoard = new Board();
    newBoard.title = title;
    newBoard.columns = [...columns];
    return getRepository(Board).save(newBoard);
  }

  async update(
    id: string,
    title: string,
    columns: IColumn[]
  ): Promise<Board | undefined> {
    const board = await getRepository(Board).findOne(id);

    if (board) {
      board.title = title;
      board.columns = [...columns];

      return getRepository(Board).save(board);
    }

    return board;
  }

  async remove(id: string): Promise<DeleteResult> {
    const deleted = await getRepository(Board).delete(id);

    return deleted;
  }
}

export default new BoardRepository();
