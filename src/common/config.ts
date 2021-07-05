import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const CONFIG = {
  PORT: +process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  FILE_LOG_REQUEST: process.env['FILE_LOG_REQUEST'],
  FILE_LOG_ERROR: process.env['FILE_LOG_ERROR'],
  SALT_ROUNDS: +process.env['SALT_ROUNDS'],
  USE_FASTIFY: process.env['USE_FASTIFY'],
};
