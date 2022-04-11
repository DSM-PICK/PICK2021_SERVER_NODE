import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';
import { notFoundAttendanceIdException } from 'src/exception/exception.attendance';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { ResFilterData, ResFilterDataArray } from './dto/resFilterData.dto';
import { StateReqData } from './dto/stateRequestData.dto';

@Injectable()
export class AttendanceService {
  constructor(private attendanceRepository: AttendanceRepository) {}

  //출석 삭제
  public async deleteAttendance(id: number) {
    if (!(await this.attendanceRepository.checkExistAttendance(id))) {
      throw notFoundAttendanceIdException;
    }

    return await this.attendanceRepository.deleteAttendance(id);
  }

  //출결변동내역 등록
  public async postAttendance(attendanceReqData: AttendanceReqData[]) {
    return attendanceReqData.map(async (item) => {
      const { state, term, reason, student_id, teacher_id } = item;
      let firstperiod = Number(item.term.substr(11, 1));
      let lastperiod = Number(item.term.substr(24));
      for (firstperiod; firstperiod <= lastperiod; firstperiod++) {
        await this.attendanceRepository.save({
          term: term,
          reason: reason,
          student_id: student_id,
          teacher_id: teacher_id,
          state: state,
          period: firstperiod,
        });
      }
    });
  }

  //출석 상태 변경
  public async updateState(stateReqData: StateReqData) {
    return await this.attendanceRepository.updateState(stateReqData);
  }

  //출석하기
  public async updateAttendance(attendance_id, doAttendanceReqDto) {
    return await this.attendanceRepository.updateAttendance(
      attendance_id,
      doAttendanceReqDto,
    );
  }

  //오늘출결변동내역 가져오기
  public async getAttendanceToday(floor, date) {
    return await this.attendanceRepository.getAttendanceToday(floor, date);
  }

  //출석조회 가져오기(필터링)
  public async getAttendanceFilter(
    date,
    state,
    floor,
  ): Promise<ResFilterData[]> {
    const arrayIndex = [];
    const array = [];
    const studentAttendance = [];
    const student = await this.attendanceRepository
      .createQueryBuilder('tbl_attendance')
      .leftJoin('tbl_attendance.student', 'student')
      .leftJoin('tbl_attendance.director', 'director')
      .leftJoin('director.schedule', 'schedule')
      .leftJoin('student.location', 'location')
      .select('student.id', 'student_id')
      .addSelect('student.name', 'student_name')
      .addSelect('student.gcn', 'gcn')
      .addSelect('tbl_attendance.period', 'period')
      .addSelect('tbl_attendance.state', 'state')
      .addSelect('location.name', 'location_name')
      .where('schedule.date: =date', { date: date })
      .where('tbl_attendance.state: =state', { state: state })
      .where('location.floor= :floor', { floor: floor })
      .orderBy('student.id', 'ASC')
      .addOrderBy('tbl_attendance.period', 'ASC')
      .getRawMany();

    let index = -1;
    for (let i = 0; i < student.length; i++) {
      if (arrayIndex.indexOf(student[i].student_id) === -1) {
        arrayIndex.push(student[i].student_id);
        array.push({
          id: student[i].student_id,
          name: student[i].student_name,
          gcn: student[i].gcn,
        });
        studentAttendance.push(
          new Array({
            period: student[i].period,
            state: student[i].state,
            location_name: student[i].location_name,
          }),
        );
        index += 1;
      } else {
        studentAttendance[index].push({
          period: student[i].period,
          state: student[i].state,
          location_name: student[i].location_name,
        });
      }
    }

    const studentFilterResponse: ResFilterData[] = [];

    for (let i = 0; i < array.length; i++) {
      studentFilterResponse.push({
        student_id: array[i].id,
        student_name: array[i].name,
        gcn: array[i].gcn,
        student_attendance: studentAttendance[i],
      });
    }

    return studentFilterResponse;
  }

  //출석 가져오기
  public async bringAttendance(location_id) {
    return await this.attendanceRepository.bringAttendance(location_id);
  }
}
