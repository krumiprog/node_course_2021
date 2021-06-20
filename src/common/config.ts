import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

import { User } from '../resources/entities/user';
import { Board } from '../resources/entities/board';
import { Task } from '../resources/entities/task';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  FILE_LOG_REQUEST: process.env['FILE_LOG_REQUEST'],
  FILE_LOG_ERROR: process.env['FILE_LOG_ERROR'],
};

export const DB_CONFIG = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [User, Board, Task],
  synchronize: true,
} as ConnectionOptions;
