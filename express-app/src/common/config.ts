import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

import { User } from '../resources/entities/user';
import { Board } from '../resources/entities/board';
import { Task } from '../resources/entities/task';
import { CreateTables1624437385810 as CreateTables } from '../migration/1624437385810-CreateTables';
import { AddAdmin1624437385811 as AddAdmin } from '../migration/1624437385811-AddAdmin';

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
  SALT_ROUNDS: process.env['SALT_ROUNDS'],
};

export const DB_CONFIG = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [User, Board, Task],
  synchronize: false,
  migrationsRun: true,
  migrations: [CreateTables, AddAdmin],
  cli: {
    migrationsDir: '../migration',
  },
} as ConnectionOptions;
