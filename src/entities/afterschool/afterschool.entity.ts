import { Column, Entity, JoinColumn,PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';

@Entity('aftershool')
export class AfterSchool {
  @PrimaryGeneratedColumn()
  after_school_id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 3 })
  day: string;

  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher;

  @JoinColumn({ name: 'location_id'})
  location: Location;
}