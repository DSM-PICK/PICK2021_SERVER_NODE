import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';

@Entity('major')
export class Major {
  @PrimaryGeneratedColumn()
  major_id: BigInt;

  @Column({ length: 20 })
  name: string;

  @JoinColumn({ name: 'head_id'})
  student: Student;

  @OneToOne(type => Teacher, teacher => teacher.teacher_id)
  teacher_id: BigInt;
  
  @OneToOne(type => Location, location => location.location_id)
  location_id: BigInt;


}