import TaskRepository from './task.memory.repository.js';
import Task from './task.model.js';

class TaskService {
  static async getAll(boardId: string) {
    return TaskRepository.getAll(boardId);
  }

  static async getById(boardId: string, id: string) {
    return TaskRepository.getById(boardId, id);
  }

  static async save(task: Task) {
    return TaskRepository.save(task);
  }

  static async update(boardId: string, id: string, task: Task) {
    return TaskRepository.update(boardId, id, task);
  }

  static async remove(boardId: string, id: string) {
    return TaskRepository.remove(boardId, id);
  }
}

export default TaskService;
