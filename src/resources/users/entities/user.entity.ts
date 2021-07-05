import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];
}
