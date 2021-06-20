import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../../types/types';
import { Task } from './task';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'jsonb', nullable: true })
  columns: IColumn[];

  @OneToMany(() => Task, (task) => task.boardId)
  tasks: Task[];
}
