import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { first } from 'rxjs';
import { Attendance } from 'src/entities/attendance.entity';
import { notFoundAttendanceIdException } from 'src/exception/exception.attendance';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { DoAttendanceReqData } from './dto/doAttendanceReq.dto';
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
  public async doAttendance(location_id: number) {}

  //오늘출결변동내역 가져오기
  public async getAttendanceToday(floor, date) {
    return await this.attendanceRepository.getAttendanceToday(floor, date);
  }

  //출석조회 가져오기(필터링)
  public async getAttendanceFilter(date, state, floor) {
    return await this.attendanceRepository.getAttendanceFilter(
      date,
      state,
      floor,
    );
  }

  //출석 가져오기
  public async bringAttendance(location_id) {
    return await this.attendanceRepository.bringAttendance(location_id);
  }
}
