import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/entities/user.entity';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { CreateTables1624437385810 as CreateTables } from './migration/1624437385810-CreateTables';
import { AddAdmin1624437385811 as AddAdmin } from './migration/1624437385811-AddAdmin';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Task],
      synchronize: false,
      migrationsRun: true,
      migrations: [CreateTables, AddAdmin],
      cli: {
        migrationsDir: './migration',
      },
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
