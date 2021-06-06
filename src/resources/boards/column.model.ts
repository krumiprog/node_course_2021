import { v4 as uuid } from 'uuid';

class Column {
  constructor(
    public id: string = uuid(),
    public title: string,
    public order: number
  ) {}
}

export default Column;
