import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @OneToMany(() => Task, (task) => task.userId)
  // tasks: Task[];
}
