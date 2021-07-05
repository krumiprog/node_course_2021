import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: TaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  async findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    const task = await this.tasksService.findOne(boardId, id);

    if (task) {
      return task;
    } else {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: TaskDto,
  ) {
    const task = await this.tasksService.update(boardId, id, updateTaskDto);

    if (task) {
      return task;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    const deleted = await this.tasksService.remove(boardId, id);

    if (deleted.affected) {
      return;
    } else {
      throw new NotFoundException();
    }
  }
}
