import { Router, Request, Response, NextFunction } from 'express';
import Task from './task.model';
import TaskService from './task.service';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../error/ApiError';

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

  res.status(StatusCodes.OK).json(tasks);
});

router.route('/:id').get((req: Request, res: Response, next: NextFunction) => {
  const boardId = req.params['boardId'] as string;
  const id = req.params['id'] as string;

  const task = TaskService.getById(boardId, id);

  if (task) {
    res.status(StatusCodes.OK).json(task);
  } else {
    next(new ApiError(StatusCodes.NOT_FOUND, `Task with id ${id} not found.`));
  }
});

router.route('/').post((req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const { title, order, description, userId, columnId } = req.body as ITaskDto;

  const task = TaskService.save(
    new Task(undefined, title, order, description, userId, boardId, columnId)
  );
  res.status(StatusCodes.CREATED).json(task);
});

router.route('/:id').put((req: Request, res: Response, next: NextFunction) => {
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

  if (task) {
    res.status(StatusCodes.OK).json(task);
  } else {
    next(
      new ApiError(StatusCodes.NOT_FOUND, `Task with id ${paramId} not found.`)
    );
  }
});

router
  .route('/:id')
  .delete((req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params['boardId'] as string;
    const id = req.params['id'] as string;
    const match = TaskService.remove(boardId, id);

    if (match === -1) {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Task with id ${id} not found.`)
      );
    } else {
      res.sendStatus(StatusCodes.NO_CONTENT);
    }
  });

export default router;
