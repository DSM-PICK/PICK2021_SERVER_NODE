import { Column, Entity, JoinColumn,OneToOne,PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToOne(type => Teacher, teacher => teacher.teacher_id)
  teacher_id: number;

  @OneToOne(type => Location, location => location.location_id)
  location_id: number;
}