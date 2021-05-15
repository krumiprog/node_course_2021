const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const boardService = require('../boards/board.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const matchBoard = await boardService.getById(boardId);
  if (!matchBoard) {
    res.sendStatus(404);
  }
  const tasks = await taskService.getAll(boardId);
  res.status(200).json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await taskService.getById(boardId, id);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId: board } = req.params;
  const matchBoard = await boardService.getById(board);
  if (!matchBoard) {
    res.sendStatus(404);
  }
  const { title, order, description, userId, boardId, columnId } = req.body;
  const task = await taskService.save(
    new Task({ title, order, description, userId, boardId, columnId })
  );
  res.status(201).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { boardId: board, id } = req.params;
  const { title, order, description, userId, boardId, columnId } = req.body;
  const task = await taskService.update(
    board,
    id,
    new Task({ title, order, description, userId, boardId, columnId })
  );
  res.status(200).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { boardId, id } = req.params;
  await taskService.remove(boardId, id);
  res.sendStatus(204);
});

module.exports = router;
