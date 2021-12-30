import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity('tbl_director')
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floor: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'schedule_id'})
  schedule: Schedule

  @ManyToOne(()=> Teacher, (teacher) => teacher.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher
}