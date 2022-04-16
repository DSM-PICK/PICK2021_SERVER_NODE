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

  @CreateDateColumn()
  date: Date;

  @Column()
  month: number;

  @Column()
  period: number;
}
