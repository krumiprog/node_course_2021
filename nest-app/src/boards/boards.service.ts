import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { IColumn } from './interfaces/column.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, columns } = createBoardDto;

    const columnsWithId: IColumn[] = columns.map((column) => {
      return { id: uuid(), ...column };
    });

    const newBoard = new Board();
    newBoard.title = title;
    newBoard.columns = [...columnsWithId];

    return this.boardsRepository.save(newBoard);
  }

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async findOne(id: string): Promise<Board | undefined> {
    return this.boardsRepository.findOne(id);
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board | undefined> {
    const board = await this.boardsRepository.findOne(id);

    if (board) {
      board.title = updateBoardDto.title;
      board.columns = [...updateBoardDto.columns];

      return this.boardsRepository.save(board);
    }

    return board;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.boardsRepository.delete(id);
  }
}
