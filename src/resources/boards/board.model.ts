import { v4 as uuid } from 'uuid';
import Column from './column.model';

class Board {
  constructor(
    public id: string = uuid(),
    public title: string,
    public columns: Column[]
  ) {}
}

export default Board;
