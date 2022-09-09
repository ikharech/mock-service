import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Response } from './Response';

@Entity('company', { schema: 'public' })
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  private!: boolean;

  @Column()
  public!: boolean;

  @OneToMany(() => Response, (response) => response.company)
  responses!: Response[];
}
