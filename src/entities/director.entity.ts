import { Column, Entity, JoinColumn, ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Schedule } from './schedule.entity';
import { Teacher } from './teacher.entity';

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
  schedule: Schedule[];

  @ManyToOne(()=> Teacher, (teacher) => teacher.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher[];

  @OneToMany(() => Attendance, (attendance) => attendance.director,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'attendance_id'})
  attendance: Attendance[];
}