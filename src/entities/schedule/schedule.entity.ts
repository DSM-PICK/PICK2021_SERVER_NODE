import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  month: number;

  @Column()
  term: string;

  @Column()
  period: number;
}