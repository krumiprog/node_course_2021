import { Router, Response } from 'express';
import Board from './board.model.js';
import Column from './column.model.js';
import BoardService from './board.service.js';

const router = Router();

router.route('/').get((res: Response) => {
  const boards = BoardService.getAll();

  res.status(200).json(boards);
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  const board = BoardService.getById(id);

  if (!board) {
    res.sendStatus(404);
  }

  res.status(200).json(board);
});

router.route('/').post((req, res) => {
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

router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body as {
    title: string;
    columns: Column[];
  };

  const board = BoardService.update(id, new Board(undefined, title, columns));

  res.status(200).json(board);
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  const match = BoardService.remove(id);

  if (match === -1) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
