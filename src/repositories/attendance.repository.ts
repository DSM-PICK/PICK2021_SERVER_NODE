import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { DoAttendanceReqData } from 'src/attendance/dto/doAttendanceReq.dto';

import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { ScheduleName } from 'src/entities/Enum/scheduleName.enum';
import {
  ResAttendance,
  StudentAttendance,
  StudentList,
} from 'src/attendance/dto/resAttendance.dto';
import { Major } from 'src/entities/major.entity';
import { Student } from 'src/entities/student.entity';

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

  public async checkExistAttendanceLocation(
    location_id: number,
  ): Promise<boolean> {
    const location = await this.createQueryBuilder('tbl_attendance')
      .select('tbl_attendance.location_id', 'location_id')
      .where('tbl_attendance.location_id = :location_id', {
        location_id: location_id,
      })
      .getRawOne();
    if (location) return true;
    else return false;
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
  public async getAttendanceToday(floor: number) {
    return await this.createQueryBuilder('tbl_attendance')
      .select('tbl_attendance.id', 'attendance_id')
      .addSelect('tbl_attendance.state', 'state')
      .addSelect('tbl_attendance.reason', 'reason')
      .addSelect('tbl_attendance.period', 'period')
      .addSelect('tbl_attendance.term', 'term')
      .leftJoin('tbl_attendance.student', 'student')
      .addSelect('student.id', 'student_id')
      .addSelect('student.name', 'name')
      .addSelect('student.gcn', 'gcn')
      .leftJoin('tbl_attendance.teacher', 'teacher')
      .addSelect('teacher.id', 'teacher_id')
      .addSelect('teacher.name', 'teacher_name')
      .leftJoin('student.location', 'location')
      .where('location.floor= :floor', { floor: floor })
      .getRawMany();
  }

  public async getAttendanceDirectorAndSchedule() {
    return await this.createQueryBuilder('tbl_attendance')
      .select('tbl_attendance.id', 'attendance_id')
      .addSelect('tbl_attendance.state', 'state')
      .addSelect('tbl_attendance.reason', 'reason')
      .addSelect('tbl_Attendance.period', 'period')
      .addSelect('tbl_attendance.term', 'term')
      .leftJoin('tbl_attendance.student', 'student')
      .addSelect('student.id', 'student_id')
      .addSelect('student.name', 'name')
      .addSelect('student.gcn', 'gcn')
      .addSelect('student.location', 'location');
  }
}
