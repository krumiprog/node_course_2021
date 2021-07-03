import dotenv from 'dotenv';
import path from 'path';

import { User } from '../users/entities/user.entity';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [User],
  // entities: [User, Board, Task],
  synchronize: false,
  // migrationsRun: true,
  // migrations: [CreateTables, AddAdmin],
  // cli: {
  //   migrationsDir: '../migration',
  // },
};
