import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  schedule_id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  month: number;

  @Column()
  date: Date;

  @Column()
  period: number;
}