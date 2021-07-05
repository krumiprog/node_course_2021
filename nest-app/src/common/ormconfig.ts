import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { CreateTables1624437385810 as CreateTables } from '../migration/1624437385810-CreateTables';
import { AddAdmin1624437385811 as AddAdmin } from '../migration/1624437385811-AddAdmin';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const CONFIG_DB = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: +process.env['POSTGRES_PORT'],
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
} as TypeOrmModuleOptions;
