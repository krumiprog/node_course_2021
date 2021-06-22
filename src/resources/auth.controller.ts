import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../utils/generateToken';
import userService from './users/user.service';
import ApiError from '../error/ApiError';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body as { login: string; password: string };

    const data = await userService.getByLogin(login, password);

    if (data) {
      const token = generateToken({ userId: data.id, login: data.login });
      res.status(StatusCodes.OK).json({ token });
    } else {
      next(
        new ApiError(
          StatusCodes.NOT_FOUND,
          `User with login ${login} not found.`
        )
      );
    }
  }
}

export default new AuthController();
