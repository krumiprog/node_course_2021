import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';

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
