import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 5 })
  name: string;

  @Column({ length: 256, unique: true })
  password: string;

  @Column({ length: 7 })
  role: string;

  @OneToOne(type => Location, location => location.id)
  location_id: number;
}