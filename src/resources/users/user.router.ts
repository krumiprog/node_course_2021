import { Router, Request, Response, NextFunction } from 'express';
import User from './user.model';
import UserService from './user.service';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../error/ApiError';

const router = Router();

interface IUserDto {
  name: string;
  login: string;
  password: string;
}

router.route('/').get((_: Request, res: Response) => {
  const users = UserService.getAll();

  res.status(StatusCodes.OK).json(users.map((user) => User.toResponse(user)));
});

router.route('/:id').get((req: Request, res: Response, next: NextFunction) => {
  const id = req.params['id'] as string;

  const user = UserService.getById(id);

  if (user) {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } else {
    next(new ApiError(StatusCodes.NOT_FOUND, `User with id ${id} not found.`));
  }
});

router.route('/').post((req: Request, res: Response) => {
  const { name, login, password } = req.body as IUserDto;

  const user = UserService.save(new User(undefined, name, login, password));

  res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put((req: Request, res: Response, next: NextFunction) => {
  const id = req.params['id'] as string;
  const { name, login, password } = req.body as IUserDto;

  const user = UserService.update(
    id,
    new User(undefined, name, login, password)
  );

  if (user) {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } else {
    next(new ApiError(StatusCodes.NOT_FOUND, `User with id ${id} not found.`));
  }
});

router
  .route('/:id')
  .delete((req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;

    const match = UserService.remove(id);

    if (match === -1) {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `User with id ${id} not found.`)
      );
    } else {
      res.sendStatus(StatusCodes.NO_CONTENT);
    }
  });

export default router;
