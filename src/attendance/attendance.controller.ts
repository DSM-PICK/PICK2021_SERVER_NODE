import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Delete(':id')
  public async deleteAttendance(@Param('id') id: number){
    console.log(id);
    await this.attendanceService.deleteAttendance(id);
    return { status: 204, message: 'success'};
  }

  @Post()
  public async postAttendance(@Body() attendanceReqData: AttendanceReqData){
    await this.attendanceService.postAttendance(attendanceReqData);
    return { status: 201, message: 'success'}
  }
  
  @Patch('/state')
  public async updateState(@Body() stateReqData: StateReqData){
    await this.attendanceService.updateState(stateReqData);
    return { status: 204, message: 'success'}
  }
}


