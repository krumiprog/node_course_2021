import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
import pkg from 'winston';
import config from '../common/config';

const { createLogger, format, transports } = pkg;
const { FILE_LOG_REQUEST, FILE_LOG_ERROR } = config;

export const loggers = {
  logInfo: createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: FILE_LOG_REQUEST })],
  }),
  logError: createLogger({
    level: 'error',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: FILE_LOG_ERROR })],
  }),
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();

  finished(req, res, () => {
    loggers.logInfo.log(
      'info',
      `${req.method} ${req.originalUrl} ${
        res.statusCode
      } params: ${JSON.stringify(req.params)} query: ${JSON.stringify(
        req.query
      )} body: ${JSON.stringify(req.body)}`
    );
  });
};
