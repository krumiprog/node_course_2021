import User from '../resources/users/user.model.js';
import Board from '../resources/boards/board.model.js';
import Task from '../resources/tasks/task.model.js';

interface IDataBase {
  users: User[];
  boards: Board[];
  tasks: Task[];
}

const DB: IDataBase = {
  users: [],
  boards: [],
  tasks: [],
};

export default DB;
