import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScheduleName } from './Enum/scheduleName.enum';

@Entity('tbl_schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    name: 'name',
    enum: ScheduleName,
  })
  name!: ScheduleName;

  @Column()
  date: number;

  @Column()
  month: number;

  @Column()
  period: number;
}
