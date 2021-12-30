import { Column, Entity, JoinColumn,OneToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';

@Entity('aftershool')
export class AfterSchool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 3 })
  day: string;

  @OneToOne(type => Teacher, teacher => teacher.id)
  teacher_id: string;

  @OneToOne(type => Location, location => location.id)
  location_id: number;
}