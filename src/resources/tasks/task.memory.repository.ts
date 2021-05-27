import DB from '../../db/inMemoryDb.js';
import Task from './task.model.js';

class TaskRepository {
  static async getAll(boardId: string): Promise<Task[]> {
    return DB.tasks.filter((task) => task.boardId === boardId);
  }

  static async getById(boardId: string, id: string): Promise<Task | undefined> {
    await DB.tasks.find((task) => task.boardId === boardId);
    return await DB.tasks.find((task) => task.id === id);
  }

  static async save(task: Task): Promise<Task> {
    await DB.tasks.push(task);
    return task;
  }

  static async update(
    boardId: string,
    id: string,
    newTask: Task
  ): Promise<Task | undefined> {
    const match = await DB.tasks.find(
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

  static async remove(boardId: string, id: string) {
    await DB.tasks.findIndex((task) => task.boardId === boardId);
    const match = await DB.tasks.findIndex((task) => task.id === id);

    if (match !== -1) {
      await DB.tasks.splice(match, 1);
    }

    return match;
  }
}

export default TaskRepository;
