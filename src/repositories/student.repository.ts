import { Attendance } from 'src/entities/attendance.entity';
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
      const locationName = attendance.state === '이동' ? attendance.name : null;
      return new StudentAttendance(
        attendance.id,
        attendance.period,
        locationName,
        attendance.state,
      );
    });
  }

  public async querySelfStudyStudentInfo(
    locationId: number,
  ): Promise<StudentInfo[]> {
    return (
      await this.createQueryBuilder('tbl_student')
        .select(['tbl_student.id', 'tbl_student.name', 'tbl_student.gcn'])
        .where('tbl_student.location_id = :locationId', {
          locationId: locationId,
        })
        .getMany()
    ).map((student) => {
      return new StudentInfo(student.id, student.name, student.gcn);
    });
  }

  public async querySelfStudyStudentAttendance(
    directorId: number,
    locationId: number,
  ): Promise<StudentAttendance[]> {
    return (
      await this.query(
        `SELECT A.id, ta.period, tl.name, ta.state FROM pick2021.tbl_student A
        LEFT JOIN tbl_attendance ta on A.id = ta.student_id AND director_id = ?
        LEFT JOIN tbl_location tl on A.location_id = tl.id
        WHERE A.location_id = ?`,
        [directorId, locationId],
      )
    ).map((attendance) => {
      const locationName = attendance.state === '이동' ? attendance.name : null;
      return new StudentAttendance(
        attendance.id,
        attendance.period,
        locationName,
        attendance.state,
      );
    });
  }

  public async findStudentLocation(id) {
    return await this.createQueryBuilder('tbl_student')
      .leftJoin('tbl_student.location', 'location')
      .select('location.name')
      .where('location.id= :id', { id: id });
  }

  public async queryAfterSchoolStudentInfo(
    afterSchoolId: number,
  ): Promise<StudentInfo[]> {
    return (
      await this.createQueryBuilder('tbl_student')
        .select(['tbl_student.id', 'tbl_student.name', 'tbl_student.gcn'])
        .leftJoin('tbl_student.affliated', 'affliated')
        .where('affliated.after_school_id', {
          afterSchoolId: afterSchoolId,
        })
        .getMany()
    ).map((student) => {
      return new StudentInfo(student.id, student.name, student.gcn);
    });
  }

  public async queryAfterSchoolStudentAttendance(
    directorId: number,
    afterSchoolId: number,
  ): Promise<StudentAttendance[]> {
    return (
      await this.query(
        `SELECT A.id, ta.period, tl.name, ta.state FROM pick2021.tbl_student A
         LEFT JOIN tbl_attendance ta on A.id = ta.student_id AND director_id = ?
         LEFT JOIN tbl_affiliated_after_school taa on A.id = taa.student_id
         LEFT JOIN tbl_after_school tas on taa.after_school_id = tas.id
         LEFT JOIN tbl_location tl on tas.location_id = tl.id
         WHERE taa.after_school_id = ?`,
        [directorId, afterSchoolId],
      )
    ).map((attendance) => {
      const locationName = attendance.state === '이동' ? attendance.name : null;

      return new StudentAttendance(
        attendance.id,
        attendance.period,
        locationName,
        attendance.state,
      );
    });
  }
}
