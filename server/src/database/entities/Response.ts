import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';

@Entity('response', { schema: 'public' })
export class Response {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 2048 })
  url!: string;

  @Column()
  statusCode!: number;

  @Column()
  type: string;

  @Column({ length: 5000 })
  body: string;

  @ManyToOne(() => Company, (company) => company.responses, {
    cascade: true,
  })
  @JoinColumn({ name: 'company' })
  company!: number;
}
