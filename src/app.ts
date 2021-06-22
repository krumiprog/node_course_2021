import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

import { requestLogger } from './middleware/logger';
import { handleError } from './middleware/handleError';
import {
  handleUncaughtException,
  handleUnhandledRejection,
} from './middleware/handleException';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { authCheck } from './middleware/authCheck';

const app = express();

app.use(express.json());

app.use(
  '/doc',
  swaggerUI.serve,
  swaggerUI.setup(YAML.load(path.join(__dirname, '../doc/api.yaml')))
);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(requestLogger);

app.use(authCheck);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use('*', (_req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send(getReasonPhrase(StatusCodes.NOT_FOUND));
});

app.use(handleError);

process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUnhandledRejection);

// Для проверки uncaughtException
// throw new Error('Oops!');

// Для проверки unhandledRejection
// Promise.reject(Error('Oops!'));

export default app;
