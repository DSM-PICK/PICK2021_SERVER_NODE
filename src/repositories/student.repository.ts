import { Student } from 'src/entities/student.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  public async queryStudentByMajorId(major_id: number) {
    return await this.createQueryBuilder('tbl_student')
      .from(Student, 'student')
      .addSelect('tbl_student.gcn', 'gcn')
      .addSelect('tbl_student.id', 'student_id')
      .addSelect('tbl_student.name', 'student_name')
      .where('tbl_student.major_id=: major_id', { major_id: major_id })
      .getMany();
  }
}
