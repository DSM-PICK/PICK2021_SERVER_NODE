import { Column, Entity, JoinColumn, Long, PrimaryGeneratedColumn } from 'typeorm';
import { Director } from '../director/director.entity';
import { Student } from '../student/student.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  attendence_id: Long;

  @Column()
  period: number;

  @Column({ length: 10 })
  state: string;

  @Column({ length: 256 })
  memo: string

  @Column({ length: 256 })
  reason: string

  @JoinColumn({ name: 'student_id'})
  student: Student;

  @JoinColumn({ name: 'director_id'})
  director: Director;

}