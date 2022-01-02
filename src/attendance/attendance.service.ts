import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance/attendance.entity';
import { notFoundAttendanceIdException } from 'src/exception/exception.attendance';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { StateReqData } from './dto/stateRequestData.dto';


@Injectable()
export class AttendanceService {
  
  private readonly attendanceRepository: AttendanceRepository;
  
  public async getAttendance(){
    return await this.attendanceRepository.getAttendance();
  }

  public async deleteAttendance(attendance_id: number){
    if(!(await this.attendanceRepository.checkExistAttendance(attendance_id))){
      throw notFoundAttendanceIdException;
    }
    return await this.attendanceRepository.delete(attendance_id);
  }

  public async postAttendance(attendanceReqData: AttendanceReqData) {
    return await this.attendanceRepository.save({
      state: attendanceReqData.state,
      term : attendanceReqData.term,
      reason: attendanceReqData.reason,
      student_id: attendanceReqData.student_id
    });
  }

  public async updateState(stateReqData: StateReqData){
    return await this.attendanceRepository.updateState(stateReqData);
  }
}
