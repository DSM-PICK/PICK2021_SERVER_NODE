import { Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import { Attendance } from 'src/entities/attendance/attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { AttendanceResData } from './dto/attendanceResponse.dto';
import { StateReqData } from './dto/stateRequestData.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {
  }

  @Patch()
  updateAttendance(@Body() attendanceId: number, AttendanceReqData: AttendanceReqData){
    return this.attendanceService.updateState(attendanceId, AttendanceReqData);
  }

  @Get()
  getAll():Attendance[]{
    return this.attendanceService.getAll();
  }

  @Patch('/state')
  updateState(@Body()id, stateReqData:StateReqData){
    return this.attendanceService.updateState(id, stateReqData );
  }
}
