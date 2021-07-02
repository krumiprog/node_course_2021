import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import taskService from './task.service';
import ApiError from '../../error/ApiError';
import { ITask } from '../../types/types';

const router = Router({ mergeParams: true });

// interface ITaskDto {
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
// }

router.route('/').get(async (req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const tasks = await taskService.getAll(boardId);

  res.status(StatusCodes.OK).json(tasks);
});

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params['boardId'] as string;
    const id = req.params['id'] as string;

    const task = await taskService.getById(boardId, id);

    if (task) {
      res.status(StatusCodes.OK).json(task);
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Task with id ${id} not found.`)
      );
    }
  });

router.route('/').post(async (req: Request, res: Response) => {
  const boardId = req.params['boardId'] as string;
  const { title, order, description, userId, columnId } = req.body as ITask;

  const task = await taskService.save({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  res.status(StatusCodes.CREATED).json(task);
});

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const paramBoardId = req.params['boardId'] as string;
    const paramId = req.params['id'] as string;
    const {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    } = req.body as ITask;

    const task = await taskService.update(paramBoardId, paramId, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });

    if (task) {
      res.status(StatusCodes.OK).json(task);
    } else {
      next(
        new ApiError(
          StatusCodes.NOT_FOUND,
          `Task with id ${paramId} not found.`
        )
      );
    }
  });

router
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params['boardId'] as string;
    const id = req.params['id'] as string;
    const deleted = await taskService.remove(boardId, id);

    if (deleted.affected) {
      res.sendStatus(StatusCodes.NO_CONTENT);
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Task with id ${id} not found.`)
      );
    }
  });

export default router;
