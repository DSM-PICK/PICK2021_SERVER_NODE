import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from '../attendance/attendance.entity';
import { Major } from '../major/major.entity';

@Entity('tbl_location')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floor: number;

  @Column()
  priority: number;

  @Column({ length: 10 })
  name: string;

  @OneToOne(()=> Major, (major) => major.location,{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })

  @JoinColumn({ name: 'id'})
  major: Major

  @OneToOne(()=> Attendance, (attendance)=> attendance.location,{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })

  @JoinColumn({ name: 'id'})
  attendance: Attendance
}