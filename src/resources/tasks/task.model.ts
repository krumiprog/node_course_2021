import { v4 as uuid } from 'uuid';

class Task {
  constructor(
    public id: string = uuid(),
    public title: string,
    public order: number,
    public description: string,
    public userId: string | null,
    public boardId: string,
    public columnId: string
  ) {}
}

export default Task;
