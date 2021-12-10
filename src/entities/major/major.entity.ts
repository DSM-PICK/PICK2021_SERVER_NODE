import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';

@Entity('major')
export class Major {
  @PrimaryGeneratedColumn()
  major_id: number;

  @Column({ length: 20 })
  name: string;

  @OneToOne(type => Student, student=> student.student_id)
  @JoinColumn({ name: 'head_id'})
  head_id: Student;

  @OneToOne(type => Teacher, teacher => teacher.teacher_id)
  teacher_id: string;
  
  @OneToOne(type => Location, location => location.location_id)
  location_id: number;


}