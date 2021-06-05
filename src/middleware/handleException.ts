import { logger } from './logger';

export const handleUncaughtException = (err: Error): void => {
  logger.log('error', `Uncaught Exception: ${err.message}`, () =>
    process.exit(1)
  );
};

export const handleUnhandledRejection = (reason: Error): void => {
  logger.log('error', `Unhandled Rejection: ${reason.message}`, () =>
    process.exit(1)
  );
};
