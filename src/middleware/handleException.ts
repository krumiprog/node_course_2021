import { loggers } from './logger';

export const handleUncaughtException = (err: Error): void => {
  loggers.logError.log('error', `Uncaught Exception: ${err.message}`, () =>
    process.exit(1)
  );
};

export const handleUnhandledRejection = (reason: Error): void => {
  loggers.logError.log('error', `Unhandled Rejection: ${reason.message}`, () =>
    process.exit(1)
  );
};
