const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await taskService.getAll(boardId);
  res.status(200).json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await taskService.getById(boardId, id);
  if (!task) {
    res.sendStatus(404);
  }
  res.status(200).json(task);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await taskService.save(new Task({ ...req.body, ...req.params }));
  res.status(201).json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await taskService.update(boardId, id, new Task({ ...req.body }));
  res.status(200).json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await taskService.remove(boardId, id);
  if (task === -1) {
    res.sendStatus(404);
  }
  res.sendStatus(204);
});

module.exports = router;
