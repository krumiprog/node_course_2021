import { DeleteResult, getRepository } from 'typeorm';
import { Board } from '../entities/board';
import { Colum } from '../entities/colum';
import { IColum } from '../../types/types';

class BoardRepository {
  async getAll(): Promise<Board[]> {
    return getRepository(Board).find({ relations: ['colums'] });
  }

  async getById(id: string): Promise<Board | undefined> {
    return getRepository(Board).findOne({
      relations: ['colums'],
      where: { id },
    });
  }

  async save(title: string, columns: IColum[]): Promise<Board> {
    const newBoard = new Board();
    newBoard.title = title;
    newBoard.colums = [];

    columns.forEach((column) => {
      const newColumn = new Colum();
      newColumn.title = column.title;
      newColumn.order = column.order;
      newBoard.colums.push(newColumn);
    });

    return getRepository(Board).save(newBoard);
  }

  async update(
    id: string,
    title: string,
    columns: Colum[]
  ): Promise<Board | undefined> {
    const board = await getRepository(Board).findOne({
      relations: ['colums'],
      where: { id },
    });

    if (board) {
      board.colums.forEach((column) => {
        getRepository(Colum).delete(column.id);
      });

      board.title = title;
      board.colums = [];

      columns.forEach((column) => {
        const newColumn = new Colum();
        newColumn.id = column.id; // ???
        newColumn.title = column.title;
        newColumn.order = column.order;
        board.colums.push(newColumn);
      });

      return getRepository(Board).save(board);
    }

    return board;
  }

  async remove(id: string): Promise<DeleteResult> {
    return getRepository(Board).delete(id);

    // const match = DB.boards.findIndex((board) => board.id === id);

    // if (match !== -1) {
    //   DB.tasks = DB.tasks.filter((task) => task.boardId !== id);
    //   DB.boards.splice(match, 1);
    // }

    // return match;
  }
}

export default new BoardRepository();
