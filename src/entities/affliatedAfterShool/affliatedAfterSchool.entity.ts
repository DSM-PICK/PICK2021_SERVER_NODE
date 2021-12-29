import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AfterSchool } from '../afterschool/afterschool.entity';
import { Student } from '../student/student.entity';

@Entity('affliatedAfterSchool')
export class AffliatedAfterSchool {
  @PrimaryGeneratedColumn()
  id: number;
 
  @ManyToOne(type => Student, student => student.id)
  student_id: number;

  @ManyToOne(type => AfterSchool, afterschool => afterschool.id)
  after_school_id: number;
}