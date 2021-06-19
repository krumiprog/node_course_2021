import { DeleteResult } from 'typeorm';
import taskRepository from './task.memory.repository';
import { Task } from '../entities/index';
import { ITask } from '../../types/types';

class TaskService {
  async getAll(boardId: string): Promise<Task[]> {
    return taskRepository.getAll(boardId);
  }

  async getById(boardId: string, id: string): Promise<Task | undefined> {
    return taskRepository.getById(boardId, id);
  }

  async save(task: ITask): Promise<Task> {
    return taskRepository.save(task);
  }

  async update(
    boardId: string,
    id: string,
    task: ITask
  ): Promise<Task | undefined> {
    return taskRepository.update(boardId, id, task);
  }

  async remove(boardId: string, id: string): Promise<DeleteResult> {
    return taskRepository.remove(boardId, id);
  }
}

export default new TaskService();
