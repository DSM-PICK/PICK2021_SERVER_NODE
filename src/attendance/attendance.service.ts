import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance/attendance.entity';
import { notFoundAttendanceIdException } from 'src/exception/exception.attendance';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { StateReqData } from './dto/stateRequestData.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private attendanceRepository: AttendanceRepository
  ){}
  
  public async getAttendance(){
    return await this.attendanceRepository.getAttendance();
  }

  public async deleteAttendance(id: number){  
    if(!await this.attendanceRepository.checkExistAttendance(id)){
      throw notFoundAttendanceIdException;
    }
    
    return await this.attendanceRepository.deleteAttendance(id);
  }

  public async postAttendance(attendanceReqData: AttendanceReqData[]) {
   return await attendanceReqData.map(item => 
       this.attendanceRepository.save([{
        state: item.state,
        term : item.term,
        reason: item.reason,
        student_id: item.student_id,
        teacher_id: item.teacher_id
      }])
    )
 
  }

  public async updateState(stateReqData: StateReqData){
    return await this.attendanceRepository.updateState(stateReqData);
  }
}
