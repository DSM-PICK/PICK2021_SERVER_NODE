import { Column, Entity, JoinColumn, Long, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  teacher_id: Long;

  @Column({ length: 5 })
  name: string;

  @Column({ length: 256, unique: true })
  password: string;

  @Column({ length: 7 })
  role: string;

  @JoinColumn({ name: 'location_id'})
  location: Location;
}