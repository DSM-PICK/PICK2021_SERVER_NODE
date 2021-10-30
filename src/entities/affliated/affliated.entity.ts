import { Column, Entity, JoinColumn, Long, PrimaryGeneratedColumn } from 'typeorm';
import { AfterSchool } from '../afterschool/afterschool.entity';
import { Student } from '../student/student.entity';

@Entity('affliatedAfterSchool')
export class AffliatedAfterSchool {
  @PrimaryGeneratedColumn()
  id: Long;

  @JoinColumn({ name: 'stuent_id'})
  student: Student;

  @JoinColumn({ name: 'after_school_id' })
  afterschool: AfterSchool;
}