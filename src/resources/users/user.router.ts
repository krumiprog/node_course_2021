import { Router } from 'express';
import User from './user.model';
import UserService from './user.service';

const router = Router();

interface IBodyUser {
  name: string;
  login: string;
  password: string;
}

router.route('/').get((_, res) => {
  const users = UserService.getAll();

  res.status(200).json(users.map((user) => User.toResponse(user)));
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  const user = UserService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(User.toResponse(user));
});

router.route('/').post((req, res) => {
  const { name, login, password } = req.body as IBodyUser;

  const user = UserService.save(new User(undefined, name, login, password));

  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put((req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body as IBodyUser;

  const user = UserService.update(
    id,
    new User(undefined, name, login, password)
  );

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;

  UserService.remove(id);

  res.sendStatus(204);
});

export default router;
