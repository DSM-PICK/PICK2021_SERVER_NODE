import { Column, Entity, JoinColumn,ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity('director')
export class Director {
  @PrimaryGeneratedColumn()
  director_id: number;

  @Column()
  floor: number;

  @ManyToOne(type => Schedule, schedule => schedule.schedule_id)
  schedule_id: number;

  @ManyToOne(type => Teacher, teacher => teacher.teacher_id)
  teacher_id: number;
}