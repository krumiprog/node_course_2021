import { Router } from 'express';
import Board from './board.model.js';
import Column from './column.model.js';
import BoardService from './board.service.js';

const router = Router();

router.route('/').get(async (req, res) => {
  console.log(req);

  const boards = await BoardService.getAll();

  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const board = await BoardService.getById(id);

  if (!board) {
    res.sendStatus(404);
  }

  res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;

  const columnsWithId = columns.map(
    (column: { title: string; order: number }) =>
      new Column(undefined, column.title, column.order)
  );

  const board = await BoardService.save(
    new Board(undefined, title, columnsWithId)
  );

  res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;

  const board = await BoardService.update(
    id,
    new Board(undefined, title, columns)
  );

  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const match = await BoardService.remove(id);

  if (match === -1) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
