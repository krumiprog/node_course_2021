import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
import pkg from 'winston';

const { createLogger, format, transports } = pkg;

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'request.log', level: 'info' }),
  ],
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();

  finished(req, res, () => {
    logger.log(
      'info',
      `${req.method} ${req.url} ${res.statusCode} params: ${JSON.stringify(
        req.params
      )} body: ${JSON.stringify(req.body)}`
    );
  });
};
