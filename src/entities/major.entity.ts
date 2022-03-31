import { Column, Entity, JoinColumn, Long, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
import { Location } from './location.entity';

@Entity('tbl_major')
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

  @OneToOne(()=> Teacher, (teacher) => teacher.major,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  @JoinColumn({ name: 'id'})
  teacher: Teacher

  @OneToOne(()=> Location, (location) => location.major,{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })

  @JoinColumn({ name: 'id'})
  location: Location
}