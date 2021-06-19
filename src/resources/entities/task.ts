import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from './user';
// import { Board } from './board';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column()
  order: number;

  @Column({ type: 'varchar', length: 30 })
  description: string;

  // @Column('varchar', { length: 10, nullable: true })
  // @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  // userId: User;

  // @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  // boardId: Board;

  @Column({ type: 'varchar', length: 10, nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', length: 10 })
  boardId: string;

  @Column({ type: 'varchar', length: 10 })
  columnId: string;
}
