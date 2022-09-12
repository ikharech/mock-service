import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roles } from '@entities/Roles';

@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryColumn({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Roles, (role) => role.users, {
    cascade: true,
  })
  @JoinColumn({ name: 'role', referencedColumnName: 'id' })
  role!: Roles;
}
