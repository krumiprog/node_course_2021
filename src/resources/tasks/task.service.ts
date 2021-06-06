import TaskRepository from './task.memory.repository';
import Task from './task.model';

class TaskService {
  static getAll(boardId: string): Task[] {
    return TaskRepository.getAll(boardId);
  }

  static getById(boardId: string, id: string): Task | undefined {
    return TaskRepository.getById(boardId, id);
  }

  static save(task: Task): Task {
    return TaskRepository.save(task);
  }

  static update(boardId: string, id: string, task: Task): Task | undefined {
    return TaskRepository.update(boardId, id, task);
  }

  static remove(boardId: string, id: string): number {
    return TaskRepository.remove(boardId, id);
  }
}

export default TaskService;
