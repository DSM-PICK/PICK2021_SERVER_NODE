import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AfterSchool } from './afterschool.entity';
import { Student } from './student.entity';

@Entity('tbl_affiliated_after_school')
export class AffliatedAfterSchool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @Column()
  after_school_id: number;

  @ManyToOne(() => Student, (student) => student.affliated, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => AfterSchool, (afterschool) => afterschool.affliated, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'after_school_id' })
  afterschool: AfterSchool;
}
