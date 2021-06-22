import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../error/ApiError';
import { validateToken } from '../utils/validateToken';

export const authCheck = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        'HTTP Authorization header not found.'
      )
    );
  }

  const jwtToken = authorization.split(' ')[1];

  if (!jwtToken) {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        'JWT token not found in HTTP Authorization header.'
      )
    );
  }

  const userData = validateToken(jwtToken);

  if (!userData) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid JWT token.'));
  }

  req.user = userData;
  next();
};
