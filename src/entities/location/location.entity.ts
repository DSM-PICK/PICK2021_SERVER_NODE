import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}