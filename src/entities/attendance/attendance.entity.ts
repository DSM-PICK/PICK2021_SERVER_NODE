import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Director } from '../director/director.entity';
import { Location } from '../location/location.entity';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity('tbl_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: number;

  @Column({ length: 10 })
  state: string;

  @Column({ length: 256 })
  memo: string;

  @Column({ length: 35 })
  term: string;

  @Column({ length: 256 })
  reason: string;

  @Column({ length: 10 })
  teacher_id: string;

  @Column()
  student_id: number;
  
  @Column()
  director_id: number;

  @ManyToOne(() => Student, (student) => student.attendance,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'id'})
  student: Student

  @ManyToOne(() => Director, (director) => director.attendance,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'id'})
  director: Director

  @ManyToOne(() => Teacher, (teacher) => teacher.attendance,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'id'})
  teacher: Teacher

  @OneToOne(() => Location, (location) => location.attendance,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'id'})
  location: Location
}