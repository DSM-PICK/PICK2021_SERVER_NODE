import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { DoAttendanceReqData } from 'src/attendance/dto/doAttendanceReq.dto';

import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {
  public async checkExistAttendance(id: number): Promise<boolean> {
    const attendance = await this.createQueryBuilder('tbl_attendance')
      .select('tbl_attendance.id', 'id')
      .where('tbl_attendance.id = :id', { id: id })
      .getRawOne();

    if (attendance) {
      return true;
    } else {
      return false;
    }
  }

  //출결 변동 내역 상태 변경
  public async updateState(stateReqData: StateReqData) {
    let state = stateReqData.state;

    return this.createQueryBuilder()
      .update(Attendance)
      .set({ state: state })
      .execute();
  }

  //출석하기
  public async updateAttendance(
    attendance_id,
    doAttendanceReqDto: DoAttendanceReqData,
  ) {
    return this.createQueryBuilder()
      .update(Attendance)
      .set({
        period: doAttendanceReqDto.period,
        state: doAttendanceReqDto.state,
        student_id: doAttendanceReqDto.student_id,
        location_id: doAttendanceReqDto.location_id,
      })
      .where('tbl_attendance.id= :id', { id: attendance_id })
      .execute();
  }

  //출석 삭제
  public async deleteAttendance(id: number) {
    console.log(id);
    return await this.createQueryBuilder('tbl_attendance')
      .delete()
      .from(Attendance)
      .where('tbl_attendance.id= :id', { id: id })
      .execute();
  }

  //오늘출결변동내역 가져오기
  public async getAttendanceToday(floor: number, date: string) {
    return await this.createQueryBuilder('tbl_attendance')
      .select('tbl_attendance.id', 'attendance_id')
      .addSelect('tbl_attendance.state', 'attendance_state')
      .addSelect('tbl_attendance.reason', 'reason')
      .addSelect('tbl_attendance.period', 'period')
      .addSelect('tbl_attendance.term', 'term')
      .leftJoin('tbl_attendance.student', 'student')
      .addSelect('student.id', 'student_id')
      .addSelect('student.name', 'name')
      .addSelect('student.gcn', 'gcn')
      .addSelect('student.state', 'state')
      .leftJoin('tbl_attendance.director', 'director')
      .addSelect('director.id', 'director_id')
      .leftJoin('director.schedule', 'schedule')
      .leftJoin('tbl_attendance.teacher', 'teacher')
      .addSelect('teacher.id', 'teacher_id')
      .addSelect('teacher.name', 'teacher_name')
      .leftJoin('student.location', 'location')
      .where('location.floor= :floor', { floor: floor })
      .andWhere('schedule.date= :date', { date: date })
      .getRawMany();
  }

  //출석 조회
  public async bringAttendance(location_id) {
    return await this.createQueryBuilder('tbl_attendance')
      .leftJoin('tbl_attendance.student', 'student')
      .leftJoinAndSelect('tbl_attendance.director', 'director')
      .leftJoin('student.major', 'major')
      .leftJoin('major.teacher', 'teacher')
      .leftJoin('student.location', 'location')
      .leftJoin('director.schedule', 'schedule')
      .select('schedule.name', 'name')
      .addSelect('location.name', 'location_name')
      .addSelect(['teacher.name', 'teacher.password'])
      .addSelect(['student.id', 'student.gcn', 'student.name'])
      .addSelect(['tbl_attendance.state', 'tbl_attendance.period'])
      .orderBy('student.id', 'ASC')
      .where('location.id= :location_id', { location_id: location_id })
      .getRawMany();
  }
}
