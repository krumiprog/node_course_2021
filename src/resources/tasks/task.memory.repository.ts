import { DeleteResult, getRepository } from 'typeorm';
import { Task } from '../entities/index';
import { ITask } from '../../types/types';

class TaskRepository {
  async getAll(boardId: string): Promise<Task[]> {
    return getRepository(Task).find({ where: { boardId } });
  }

  async getById(boardId: string, id: string): Promise<Task | undefined> {
    return getRepository(Task).findOne({ where: { boardId, id } });
  }

  async save(task: ITask): Promise<Task> {
    const newTask = new Task();
    newTask.title = task.title;
    newTask.order = task.order;
    newTask.description = task.description;
    newTask.userId = task.userId;
    newTask.boardId = task.boardId;
    newTask.columnId = task.columnId;

    return getRepository(Task).save(newTask);
  }

  async update(
    _boardId: string,
    id: string,
    newTask: ITask
  ): Promise<Task | undefined> {
    const task = await getRepository(Task).findOne(id);

    if (task) {
      task.title = newTask.title;
      task.order = newTask.order;
      task.description = newTask.description;
      task.userId = newTask.userId;
      task.boardId = newTask.boardId;
      task.columnId = newTask.columnId;
      return getRepository(Task).save(task);
    }

    return task;
  }

  async remove(boardId: string, id: string): Promise<DeleteResult> {
    return getRepository(Task).delete({ boardId, id });
  }
}

export default new TaskRepository();
