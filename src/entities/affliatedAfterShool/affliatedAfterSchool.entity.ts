import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AfterSchool } from '../afterschool/afterschool.entity';
import { Student } from '../student/student.entity';

@Entity(' tbl_affiliated_after_school')
export class AffliatedAfterSchool {
  @PrimaryGeneratedColumn()
  id: number;
 
  @ManyToOne(() => Student, (student) => student.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'student_id'})
  student: Student

  @ManyToOne(() => AfterSchool, (afterschool) => afterschool.id,{
    onUpdate: 'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'after_school_id'})
  afterschool: AfterSchool
}