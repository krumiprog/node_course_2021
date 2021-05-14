const router = require('express').Router();
const { v4: uuid } = require('uuid');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const colWithId = columns.map((column) => ({
    id: uuid(),
    title: column.title,
    order: column.order,
  }));
  const board = await boardsService.save(
    new Board({ title, columns: colWithId })
  );
  res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const board = await boardsService.update(id, new Board({ title, columns }));
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardsService.remove(id);
  res.sendStatus(204);
});

module.exports = router;
