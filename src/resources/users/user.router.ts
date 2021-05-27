import { Router } from 'express';
import User from './user.model.js';
import UserService from './user.service.js';

const router = Router();

router.route('/').get(async (req, res) => {
  console.log(req);

  const users = await UserService.getAll();

  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const user = await UserService.getById(id);

  if (user) {
    res.status(200).json(User.toResponse(user));
  }

  res.sendStatus(404);
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;

  const user = await UserService.save(
    new User(undefined, name, login, password)
  );

  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;

  const user = await UserService.update(
    id,
    new User(undefined, name, login, password)
  );

  if (user) {
    res.status(200).json(User.toResponse(user));
  }

  res.sendStatus(404);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  await UserService.remove(id);

  res.sendStatus(204);
});

export default router;
