import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { StateReqData } from './dto/stateRequestData.dto';


@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  public async getAttendance(){
    return await this.attendanceService.getAttendance();
  }

  @Delete('/attendance')
  public async deleteAttendance(@Body() attendance_id: number){
    await this.attendanceService.deleteAttendance(attendance_id);
    return { status: 204, message: 'success'};
  }

  @Post('')
  public async postAttendance(@Body() attendanceReqData: AttendanceReqData){
    await this.attendanceService.postAttendance(attendanceReqData);
    return { status: 204, message: 'success'}
  }
  
  @Patch('/state')
  public async updateState(@Body() stateReqData: StateReqData){
    await this.attendanceService.updateState(stateReqData);
    return { status: 204, message: 'success'}
  }
}


