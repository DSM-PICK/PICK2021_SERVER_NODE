import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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