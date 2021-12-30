import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';

@Entity('major')
export class Major {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToOne(() => Student, (student)=> student.id,{
    onUpdate:'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'head_id'})
  student: Student;

  @OneToOne(()=> Teacher, (teacher) => teacher.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher
  
  @OneToOne(() => Location, (location) => location.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'location_id'})
  location: Location


}