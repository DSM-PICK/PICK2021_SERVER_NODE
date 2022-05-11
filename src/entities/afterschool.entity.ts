import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Location } from './location.entity';
import { Student } from './student.entity';
import { AffliatedAfterSchool } from './affliatedAfterSchool.entity';

@Entity('tbl_after_school')
export class AfterSchool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 3 })
  day: string;

  @OneToOne(() => Teacher, (teacher) => teacher.afterschool, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToOne(() => Location, (location) => location.afterschool, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'afterschool_id' })
  afterschool: AfterSchool;

  @OneToOne(() => Location, (location) => location.afterschool, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @OneToMany(() => AffliatedAfterSchool, (affliated) => affliated.afterschool)
  affliated: AffliatedAfterSchool[];
}
