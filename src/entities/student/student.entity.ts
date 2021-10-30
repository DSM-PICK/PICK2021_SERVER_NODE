import { Column, Entity, JoinColumn, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';
import { Major } from '../major/major.entity';


@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  student_id: Long;

  @Column({ length: 5 })
  name: string;

  @Column({ length: 4, unique: true })
  gcn: string;

  @Column({ length: 20 })
  state: string;

  @Column({ length: 2 })
  year: string;

  @JoinColumn({ name: 'location_id'})
  location: Location;

  @JoinColumn({ name: 'major_id'})
  major: Major;
}