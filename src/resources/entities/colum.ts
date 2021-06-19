import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Board } from './board';

import { Board } from './index';

@Entity()
export class Colum {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.colums, { onDelete: 'CASCADE' })
  boardId: Board;
}
