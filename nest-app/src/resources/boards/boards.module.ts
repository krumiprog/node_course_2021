import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
