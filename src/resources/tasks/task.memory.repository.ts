import DB from '../../db/inMemoryDb';
import Task from './task.model';

class TaskRepository {
  static getAll(boardId: string): Task[] {
    return DB.tasks.filter((task) => task.boardId === boardId);
  }

  static getById(boardId: string, id: string): Task | undefined {
    DB.tasks.find((task) => task.boardId === boardId);
    return DB.tasks.find((task) => task.id === id);
  }

  static save(task: Task): Task {
    DB.tasks.push(task);
    return task;
  }

  static update(boardId: string, id: string, newTask: Task): Task | undefined {
    const match = DB.tasks.find(
      (task) => task.boardId === boardId && task.id === id
    );

    if (match) {
      match.title = newTask.title;
      match.order = newTask.order;
      match.description = newTask.description;
      match.userId = newTask.userId;
      match.boardId = newTask.boardId;
      match.columnId = newTask.columnId;
    }

    return match;
  }

  static remove(boardId: string, id: string): number {
    DB.tasks.findIndex((task) => task.boardId === boardId);
    const match = DB.tasks.findIndex((task) => task.id === id);

    if (match !== -1) {
      DB.tasks.splice(match, 1);
    }

    return match;
  }
}

export default TaskRepository;
