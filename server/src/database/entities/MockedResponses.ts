import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Companies } from '@entities/Companies';

@Entity('mocked_responses', { schema: 'public' })
export class MockedResponses {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 2048 })
  url!: string;

  @Column()
  statusCode!: number;

  @Column()
  type: string;

  @Column({ length: 5000 })
  successBody: string;

  @Column({ length: 5000 })
  errorBody: string;

  @Column()
  requestType: string;

  @ManyToOne(() => Companies, (company) => company.responses, {
    cascade: true,
  })
  @JoinColumn({ name: 'company' })
  company!: number;
}
