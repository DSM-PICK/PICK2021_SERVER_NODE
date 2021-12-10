import { Column, Entity, JoinColumn,ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Director } from '../director/director.entity';
import { Student } from '../student/student.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  attendence_id: number;

  @Column()
  period: number;

  @Column({ length: 10 })
  state: string;

  @Column({ length: 256 })
  memo: string

  @Column({ length: 256 })
  reason: string

  @ManyToOne(type => Student, student => student.student_id)
  student_id: number;

  @ManyToOne(type => Director, director => director.director_id)
  director_id: number;

}