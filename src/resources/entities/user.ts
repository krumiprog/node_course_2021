import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 30 })
  name: string;

  @Column('varchar', { length: 30 })
  login: string;

  @Column('varchar', { length: 30 })
  password: string;
}
