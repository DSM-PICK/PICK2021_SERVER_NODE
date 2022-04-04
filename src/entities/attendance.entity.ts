import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Director } from './director.entity';
import { Location } from './location.entity';
import { Schedule } from './schedule.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity('tbl_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: number;

  @Column({ length: 10 })
  state: string;

  @Column({ length: 256 })
  memo: string;

  @Column({ length: 35 })
  term: string;

  @Column({ length: 256 })
  reason: string;

  @Column({ length: 10 })
  teacher_id: string;

  @Column()
  student_id: number;

  @Column()
  director_id: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Student, (student) => student.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  student: Student;

  @ManyToOne(() => Director, (director) => director.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  director: Director;

  @ManyToOne(() => Teacher, (teacher) => teacher.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  teacher: Teacher;

  @ManyToOne(() => Location, (location) => location.attendance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  location: Location;

  @OneToMany(() => Schedule, (schedule) => schedule.attendance)
  schedule: Schedule[];
}
