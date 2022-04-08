import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('tbl_schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  month: number;

  @Column()
  period: number;
}
