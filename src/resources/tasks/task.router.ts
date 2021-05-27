import { Router } from 'express';
import Task from './task.model.js';
import TaskService from './task.service.js';

const router = Router();

interface IBodyTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

router.route('/:boardId/tasks').get((req, res) => {
  const { boardId } = req.params;

  const tasks = TaskService.getAll(boardId);

  res.status(200).json(tasks);
});

router.route('/:boardId/tasks/:id').get((req, res) => {
  const { boardId, id } = req.params;

  const task = TaskService.getById(boardId, id);

  if (!task) {
    res.sendStatus(404);
  }

  res.status(200).json(task);
});

router.route('/:boardId/tasks').post((req, res) => {
  const { boardId: paramBoardId } = req.params;
  const { title, order, description, userId, columnId } = req.body as IBodyTask;

  const task = TaskService.save(
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

router.route('/:boardId/tasks/:id').put((req, res) => {
  const { boardId: paramBoardId, id: paramId } = req.params;
  const {
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  } = req.body as IBodyTask;

  const task = TaskService.update(
    paramBoardId,
    paramId,
    new Task(undefined, title, order, description, userId, boardId, columnId)
  );

  res.status(200).json(task);
});

router.route('/:boardId/tasks/:id').delete((req, res) => {
  const { boardId, id } = req.params;
  const task = TaskService.remove(boardId, id);

  if (task === -1) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
});

export default router;
