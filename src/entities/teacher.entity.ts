import {
  Column,
  Entity,
  JoinColumn,
  Long,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';
import { Location } from './location.entity';
import { Major } from './major.entity';

@Entity('tbl_teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 5 })
  name: string;

  @Column({ length: 256, unique: true })
  password: string;

  @Column({ length: 7 })
  role: string;

  @OneToOne(() => Location, (location) => location.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  location: Location;

  @OneToMany(() => Attendance, (attendance) => attendance.teacher)
  attendance: Attendance[];

  @OneToOne(() => Major, (major) => major.teacher)
  major: Major;
}
