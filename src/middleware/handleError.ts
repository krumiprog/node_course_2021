import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import ApiError from '../error/ApiError';
import { loggers } from './logger';

export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  loggers.logError.log('error', err.message);

  if (err instanceof ApiError) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }

  next();
};
