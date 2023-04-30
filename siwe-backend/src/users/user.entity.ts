import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['address'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  username: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text')
  address: string;

  @Column('text', { nullable: true })
  nonce: string;
}
