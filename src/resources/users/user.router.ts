import { Router, Request, Response, NextFunction } from 'express';
import userService from './user.service';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../error/ApiError';
import { toResponse } from '../../utils/toResponse';
import { IUser } from '../../types/types';

const router = Router();

router.route('/').get(async (_: Request, res: Response) => {
  const users = await userService.getAll();

  res.status(StatusCodes.OK).json(users.map((user) => toResponse(user)));
});

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const user = await userService.getById(id);

    if (user) {
      res.status(StatusCodes.OK).json(toResponse(user));
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `User with id ${id} not found.`)
      );
    }
  });

router.route('/').post(async (req: Request, res: Response) => {
  const { name, login, password } = req.body as IUser;
  const newUser = await userService.save({ name, login, password });

  res.status(StatusCodes.CREATED).json(toResponse(newUser));
});

router
  .route('/:id')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const { name, login, password } = req.body as IUser;

    const user = await userService.update(id, { name, login, password });

    if (user) {
      res.status(StatusCodes.OK).json(toResponse(user));
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `User with id ${id} not found.`)
      );
    }
  });

router
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params['id'] as string;
    const deleted = await userService.remove(id);

    if (deleted.affected) {
      res.sendStatus(StatusCodes.NO_CONTENT);
    } else {
      next(
        new ApiError(StatusCodes.NOT_FOUND, `User with id ${id} not found.`)
      );
    }
  });

export default router;
