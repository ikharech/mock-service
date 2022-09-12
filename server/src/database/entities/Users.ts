import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roles } from '@entities/Roles';

@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryColumn({ unique: true, nullable: false })
  username!: string;

  @Column({ nullable: false })
  password!: string;

  @ManyToOne(() => Roles, (role) => role.users, {
    cascade: true,
  })
  @JoinColumn({ name: 'role', referencedColumnName: 'id' })
  role!: Roles;
}
