import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../../utils/generateToken';
import loginService from './login.service';
import ApiError from '../../error/ApiError';

const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body as { login: string; password: string };

    const user = await loginService.getUser(login, password);

    if (user) {
      const token = generateToken({ userId: user.id, login: user.login });
      res.status(StatusCodes.OK).json({ token });
    } else {
      next(
        new ApiError(
          StatusCodes.FORBIDDEN,
          `User with login ${login} not found.`
        )
      );
    }
  });

export default router;
