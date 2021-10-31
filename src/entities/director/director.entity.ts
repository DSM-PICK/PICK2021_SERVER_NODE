import { Column, Entity, JoinColumn,PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity('director')
export class Director {
  @PrimaryGeneratedColumn()
  Director_id: number;

  @Column()
  floor: number;

  @JoinColumn({ name: 'schedule_id'})
  schedule: Schedule;

  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher;
}