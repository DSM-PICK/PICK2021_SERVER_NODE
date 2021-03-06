import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AfterSchool } from './afterschool.entity';
import { Attendance } from './attendance.entity';
import { Major } from './major.entity';
import { Teacher } from './teacher.entity';

@Entity('tbl_location')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floor: number;

  @Column()
  priority: number;

  @Column({ length: 10 })
  name: string;

  @OneToOne(() => Major, (major) => major.location, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'major_id' })
  major: Major;

  @OneToMany(() => Attendance, (attendance) => attendance.location)
  attendance: Attendance[];

  @OneToMany(() => AfterSchool, (afterschool) => afterschool.location)
  afterschool: AfterSchool[];

  @OneToOne(() => Teacher, (teacher) => teacher.location, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
