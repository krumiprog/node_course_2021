import { Router, Request, Response } from 'express';
import Board from './board.model';
import Column from './column.model';
import BoardService from './board.service';

const router = Router();

interface IBoardDto {
  title: string;
  columns: Column[];
}

router.route('/').get((_: Request, res: Response) => {
  const boards = BoardService.getAll();

  res.status(200).json(boards);
});

router.route('/:id').get((req: Request, res: Response) => {
  const id = req.params['id'] as string;

  const board = BoardService.getById(id);

  if (!board) {
    res.sendStatus(404);
  }

  res.status(200).json(board);
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

  res.status(201).json(board);
});

router.route('/:id').put((req: Request, res: Response) => {
  const id = req.params['id'] as string;
  const { title, columns } = req.body as IBoardDto;

  const board = BoardService.update(id, new Board(undefined, title, columns));

  res.status(200).json(board);
});

router.route('/:id').delete((req: Request, res: Response) => {
  const id = req.params['id'] as string;
  const match = BoardService.remove(id);

  if (match === -1) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
