import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MockedResponse } from './MockedResponse';

@Entity('company', { schema: 'public' })
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  private!: boolean;

  @Column()
  public!: boolean;

  @OneToMany(() => MockedResponse, (response) => response.company)
  responses!: MockedResponse[];
}
