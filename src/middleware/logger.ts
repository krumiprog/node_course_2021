import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
import pkg from 'winston';

const { createLogger, format, transports } = pkg;

export const loggers = {
  logInfo: createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: 'logs/request.log' })],
  }),
  logError: createLogger({
    level: 'error',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: 'logs/error.log' })],
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
      `${req.method} ${req.url} ${res.statusCode} params: ${JSON.stringify(
        req.params
      )} query: ${JSON.stringify(req.query)} body: ${JSON.stringify(req.body)}`
    );
  });
};
