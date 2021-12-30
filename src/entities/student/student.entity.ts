import { Column, Entity, JoinColumn, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';
import { Major } from '../major/major.entity';


@Entity('tbl_student')
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

  @ManyToOne(() => Location, (location) => location.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'location_id'})
  location: Location
  
  @ManyToOne(() => Major, (major) => major.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'major_id'})
  major: Major
}