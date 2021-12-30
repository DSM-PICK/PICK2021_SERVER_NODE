import { Column, Entity, ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity('director')
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floor: number;

  @ManyToOne(type => Schedule, schedule => schedule.id)
  schedule_id: number;

  @ManyToOne(type => Teacher, teacher => teacher.id)
  teacher_id: number;
}