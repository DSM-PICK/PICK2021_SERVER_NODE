import { Student } from 'src/entities/student.entity';
import { EntityRepository, Repository } from 'typeorm';
import { StudentAttendance } from './vo/student/studentAttendance.vo';
import { StudentInfo } from './vo/student/studentInfo.vo';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  public async queryStudentInfo(majorId: number): Promise<StudentInfo[]> {
    return (
      await this.createQueryBuilder('tbl_student')
        .select(['tbl_student.id', 'tbl_student.name', 'tbl_student.gcn'])
        .where('tbl_student.major_id = :majorId', { majorId: majorId })
        .getMany()
    ).map((student) => {
      return new StudentInfo(student.id, student.name, student.gcn);
    });
  }

  public async queryStudentAttendance(
    directorId: number,
    majorId: number,
  ): Promise<StudentAttendance[]> {
    return (
      await this.query(
        `SELECT A.id, ta.period, tl.name, ta.state FROM pick2021.tbl_student A
        LEFT JOIN tbl_attendance ta on A.id = ta.student_id AND director_id = ?
        LEFT JOIN tbl_location tl on ta.location_id = tl.id
        WHERE A.major_id = ?`,
        [directorId, majorId],
      )
    ).map((attendance) => {
      const locationName =
        attendance.state == '외 출' ? attendance.getLocationName() : null;
      return new StudentAttendance(
        attendance.id,
        attendance.period,
        locationName,
        attendance.state,
      );
    });
  }
}
