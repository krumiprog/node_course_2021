import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Colum } from './colum';
// import { Task } from './task';

import { Colum, Task } from './index';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @OneToMany(() => Colum, (colum) => colum.boardId)
  colums: Colum[];

  @OneToMany(() => Task, (task) => task.boardId)
  tasks: Task[];
}
