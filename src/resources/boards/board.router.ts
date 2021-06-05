import { Router, Request, Response, NextFunction } from 'express';
import Board from './board.model';
import Column from './column.model';
import BoardService from './board.service';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../error/ApiError';

const router = Router();

interface IBoardDto {
  title: string;
  columns: Column[];
}

router.route('/').get((_: Request, res: Response) => {
  const boards = BoardService.getAll();

  res.status(StatusCodes.OK).json(boards);
});

router.route('/:id').get((req: Request, res: Response, next: NextFunction) => {
  const id = req.params['id'] as string;

  const board = BoardService.getById(id);

  if (board) {
    res.status(StatusCodes.OK).json(board);
  } else {
    next(new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`));
  }
});

router.route('/').post((req: Request, res: Response) => {
  const { title, columns } = req.body as {
    title: string;
    columns: { title: string; order: number }[];
  };

  const columnsWithId: Column[] = columns.map(
    (column) => new Column(undefined, column.title, column.order)
  );

  const board = BoardService.save(new Board(undefined, title, columnsWithId));

  res.status(StatusCodes.CREATED).json(board);
});

router.route('/:id').put((req: Request, res: Response, next: NextFunction) => {
  const id = req.params['id'] as string;
  const { title, columns } = req.body as IBoardDto;

  const board = BoardService.update(id, new Board(undefined, title, columns));

  if (board) {
    res.status(StatusCodes.OK).json(board);
  } else {
    next(new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`));
  }
});

router
  .route('/:id')
  .delete((req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const match = BoardService.remove(id);

    if (match === -1) {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `Board with id ${id} not found.`)
      );
    } else {
      res.sendStatus(StatusCodes.NO_CONTENT);
    }
  });

export default router;
