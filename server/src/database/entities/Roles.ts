import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '@entities/Users';

@Entity('roles', { schema: 'public' })
export class Roles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Users, (user) => user.role)
  users!: Users[];
}
