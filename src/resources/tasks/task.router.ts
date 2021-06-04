import { Router, Request, Response } from 'express';
import Task from './task.model';
import TaskService from './task.service';

const router = Router({ mergeParams: true });

interface ITaskDto {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

router.route('/').get((req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;

  const tasks = TaskService.getAll(boardId);

  res.status(200).json(tasks);
});

router.route('/:id').get((req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const id = req.params['id'] as string;

  const task = TaskService.getById(boardId, id);

  if (!task) {
    res.sendStatus(404);
  }

  res.status(200).json(task);
});

router.route('/').post((req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const { title, order, description, userId, columnId } = req.body as ITaskDto;

  const task = TaskService.save(
    new Task(undefined, title, order, description, userId, boardId, columnId)
  );
  res.status(201).json(task);
});

router.route('/:id').put((req: Request, res: Response) => {
  const paramBoardId = req.params['boardId'] as string;
  const paramId = req.params['id'] as string;
  const {
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  } = req.body as ITaskDto;

  const task = TaskService.update(
    paramBoardId,
    paramId,
    new Task(undefined, title, order, description, userId, boardId, columnId)
  );

  res.status(200).json(task);
});

router.route('/:id').delete((req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const id = req.params['id'] as string;
  const task = TaskService.remove(boardId, id);

  if (task === -1) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
