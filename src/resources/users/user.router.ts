import { Router, Request, Response } from 'express';
import User from './user.model';
import UserService from './user.service';

const router = Router();

interface IUserDto {
  name: string;
  login: string;
  password: string;
}

router.route('/').get((_: Request, res: Response) => {
  const users = UserService.getAll();

  res.status(200).json(users.map((user) => User.toResponse(user)));
});

router.route('/:id').get((req: Request, res: Response) => {
  const id = req.params['id'] as string;

  const user = UserService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(User.toResponse(user));
});

router.route('/').post((req: Request, res: Response) => {
  const { name, login, password } = req.body as IUserDto;

  const user = UserService.save(new User(undefined, name, login, password));

  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put((req: Request, res: Response) => {
  const id = req.params['id'] as string;
  const { name, login, password } = req.body as IUserDto;

  const user = UserService.update(
    id,
    new User(undefined, name, login, password)
  );

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete((req: Request, res: Response) => {
  const id = req.params['id'] as string;

  UserService.remove(id);

  res.sendStatus(204);
});

export default router;
