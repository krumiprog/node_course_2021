import { Router } from 'express';
import Task from './task.model.js';
import TaskService from './task.service.js';

const router = Router();

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;

  const tasks = await TaskService.getAll(boardId);

  res.status(200).json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = req.params;

  const task = await TaskService.getById(boardId, id);

  if (!task) {
    res.sendStatus(404);
  }

  res.status(200).json(task);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId: paramBoardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;

  const task = await TaskService.save(
    new Task(
      undefined,
      title,
      order,
      description,
      userId,
      paramBoardId,
      columnId
    )
  );
  res.status(201).json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { boardId: paramBoardId, id: paramId } = req.params;
  const { title, order, description, userId, boardId, columnId } = req.body;

  const task = await TaskService.update(
    paramBoardId,
    paramId,
    new Task(undefined, title, order, description, userId, boardId, columnId)
  );

  res.status(200).json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await TaskService.remove(boardId, id);

  if (task === -1) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
