import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';
import { Location } from './location.entity';
import { Major } from './major.entity';

@Entity('tbl_teacher')
export class Teacher {
  @PrimaryColumn({ length: 10 })
  id: string;

  @Column({ length: 5 })
  name: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 7 })
  role: string;

  @OneToOne(() => Location, (location) => location.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @OneToMany(() => Attendance, (attendance) => attendance.teacher)
  attendance: Attendance[];

  @OneToOne(() => Major, (major) => major.teacher)
  @JoinColumn({ name: 'major_id' })
  major: Major;
}
