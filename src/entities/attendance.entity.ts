import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { State } from './Enum/state.enum';
import { Director } from './director.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity('tbl_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    name: 'state',
    enum: State,
  })
  state!: State;

  @Column()
  period: number;

  @Column({ length: 35 })
  term: string;

  @Column({ length: 256 })
  reason: string;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Director, (director) => director.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToOne(() => Teacher, (teacher) => teacher.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
