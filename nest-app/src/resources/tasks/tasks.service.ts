import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: TaskDto): Promise<Task> {
    const newTask = new Task();
    newTask.title = createTaskDto.title;
    newTask.order = createTaskDto.order;
    newTask.description = createTaskDto.description;
    newTask.userId = createTaskDto.userId;
    newTask.boardId = boardId;
    newTask.columnId = createTaskDto.columnId;

    return this.tasksRepository.save(newTask);
  }

  async findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({ boardId });
  }

  async findOne(boardId: string, id: string): Promise<Task | undefined> {
    return this.tasksRepository.findOne({ where: { boardId, id } });
  }

  async update(
    _boardId: string,
    id: string,
    updateTaskDto: TaskDto,
  ): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne(id);

    if (task) {
      task.title = updateTaskDto.title;
      task.order = updateTaskDto.order;
      task.description = updateTaskDto.description;
      task.userId = updateTaskDto.userId;
      task.boardId = updateTaskDto.boardId;
      task.columnId = updateTaskDto.columnId;

      return this.tasksRepository.save(task);
    }

    return task;
  }

  async remove(boardId: string, id: string): Promise<DeleteResult> {
    return this.tasksRepository.delete({ boardId, id });
  }
}
