import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import boardService from './board.service';
import ApiError from '../../error/ApiError';
import { IColumn } from '../../types/types';
import { v4 as uuid } from 'uuid';

const router = Router();

router.route('/').get(async (_: Request, res: Response) => {
  const boards = await boardService.getAll();

  res.status(StatusCodes.OK).json(boards);
});

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;

    const board = await boardService.getById(id);

    if (board) {
      res.status(StatusCodes.OK).json(board);
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`)
      );
    }
  });

router.route('/').post(async (req: Request, res: Response) => {
  const { title, columns } = req.body as {
    title: string;
    columns: {
      title: string;
      order: number;
    }[];
  };

  const columnsWithId: IColumn[] = columns.map((column) => {
    return { id: uuid(), ...column };
  });

  const board = await boardService.save(title, columnsWithId);
  res.status(StatusCodes.CREATED).json(board);
});

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body as {
      title: string;
      columns: IColumn[];
    };

    const board = await boardService.update(id, title, columns);

    if (board) {
      res.status(StatusCodes.OK).json(board);
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`)
      );
    }
  });

router
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const deleted = await boardService.remove(id);

    if (deleted.affected) {
      res.sendStatus(StatusCodes.NO_CONTENT);
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`)
      );
    }
  });

export default router;
