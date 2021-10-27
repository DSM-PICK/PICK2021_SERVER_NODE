import { Column, Entity, JoinColumn, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn()
  location_id: Long;

  @Column()
  floor: number;

  @Column()
  priority: number;

  @Column({ length: 10 })
  name: string;
}