import { Column, Entity, JoinColumn, Long, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';

@Entity('major')
export class Major {
  @PrimaryGeneratedColumn()
  major_id: Long;

  @Column({ length: 20 })
  name: string;

  @JoinColumn({ name: 'head_id'})
  student: Student;

  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @JoinColumn({ name: 'location_id'})
  location: Location;


}