import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Director } from '../director/director.entity';
import { Student } from '../student/student.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: number;

  @Column({ length: 10 })
  state: string;

  @Column({ length: 256 })
  memo: string

  @Column({ length: 256 })
  reason: string

  @ManyToOne(() => Student, (student) => student.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'student_id'})
  student: Student;

  @ManyToOne(() => Director, (director) => director.id,{
    onUpdate: 'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'director_id'})
  director: Director;

}