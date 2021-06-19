import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import boardService from './board.service';
import ApiError from '../../error/ApiError';
import { Colum } from '../entities/colum';
import { IColum } from '../../types/types';

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
    columns: IColum[];
  };

  const board = await boardService.save(title, columns);
  res.status(StatusCodes.CREATED).json(board);
});

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body as {
      title: string;
      columns: Colum[];
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

    // const id = req.params['id'] as string;
    // const match = boardService.remove(id);

    // if (match === -1) {
    //   next(
    //     new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`)
    //   );
    // } else {
    //   res.sendStatus(StatusCodes.NO_CONTENT);
    // }
  });

export default router;
