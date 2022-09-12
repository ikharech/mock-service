import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MockedResponses } from '@entities/MockedResponses';

@Entity('companies', { schema: 'public' })
export class Companies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  private!: boolean;

  @Column({ nullable: true })
  public!: boolean;

  @OneToMany(() => MockedResponses, (response) => response.company)
  responses!: MockedResponses[];
}
