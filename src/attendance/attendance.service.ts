import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';
import { notFoundAttendanceIdException } from 'src/exception/exception.attendance';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { DoAttendanceReqData } from './dto/doAttendanceReq.dto';
import { StateReqData } from './dto/stateRequestData.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private attendanceRepository: AttendanceRepository
  ){}
  
  public async getAttendanceToday(floor){
    return await this.attendanceRepository.getAttendanceToday(floor);
  }

  public async deleteAttendance(id: number){  
    if(!await this.attendanceRepository.checkExistAttendance(id)){
      throw notFoundAttendanceIdException;
    }
    
    return await this.attendanceRepository.deleteAttendance(id);
  }

  public async postAttendance(attendanceReqData: AttendanceReqData[]) {
   return await attendanceReqData.map(item =>{
       const {state, term, reason, student_id, teacher_id} = item;
       this.attendanceRepository.save([{
        state,
        term,
        reason,
        student_id,
        teacher_id
      }])
     }
    )
  }

  public async updateState(stateReqData: StateReqData){
    return await this.attendanceRepository.updateState(stateReqData);
  }

  // public async doAttendance(location_id: number, doAttendanceDto:DoAttendanceReqData){
  //   return await this.attendanceRepository.save(location_id, doAttendanceDto );
  // }
}