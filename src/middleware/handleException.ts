import { loggers } from './logger';

export const handleUncaughtException = (err: Error): void => {
  loggers.logError.log('error', `Uncaught Exception: ${err.message}`);
  setTimeout(() => process.exit(1), 1000);
};

export const handleUnhandledRejection = (err: Error): void => {
  loggers.logError.log('error', `Unhandled Rejection: ${err.message}`);
  setTimeout(() => process.exit(1), 1000);
};
