import { Column, Entity, JoinColumn, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';
import { Major } from '../major/major.entity';


@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  name: string;

  @Column({ length: 4, unique: true })
  gcn: string;

  @Column({ length: 20 })
  state: string;

  @Column({ length: 2 })
  year: string;

  @ManyToOne(type => Location, location => location.id)
  location_id: number;
  
  @ManyToOne(type => Major, major => major.id)
  major_id: number;
}