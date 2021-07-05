import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../interfaces/column.interface';
import { Task } from '../../tasks/entities/task.entity';

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
