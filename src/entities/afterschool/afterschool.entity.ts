import { Column, Entity, JoinColumn,OneToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Location } from '../location/location.entity';
import { Student } from '../student/student.entity';

@Entity('aftershool')
export class AfterSchool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 3 })
  day: string;

  @OneToOne(() => Teacher, (teacher) => teacher.id,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher

  @OneToOne(() => Location, (location) => location.id,{
    onUpdate: 'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'location_id'})
  student: Student
}