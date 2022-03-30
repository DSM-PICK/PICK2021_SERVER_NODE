import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { DoAttendanceReqData } from './dto/doAttendanceReq.dto';
import { StateReqData } from './dto/stateRequestData.dto';


@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  //오늘출결변동내역 가져오기
  @Get()
  public async getAttendanceToday(@Query('floor') floor: number){
    return await this.attendanceService.getAttendanceToday(floor);
  }

  @Delete('/:id')
  public async deleteAttendance(@Param('id') id: number){
    await this.attendanceService.deleteAttendance(id);
    return { status: 204, message: 'success'};
  }

  //등록 배열로 받기
  // (new ParseArrayPipe({ items: AttendanceReqData })) attendanceReqData:AttendanceReqData
  @Post()
  public async postAttendance(@Body() attendanceReqData:AttendanceReqData[]){
    console.log(attendanceReqData);
    await this.attendanceService.postAttendance(attendanceReqData);
    return { status: 201, message: 'success'}
  }
  
  @Patch('/state')
  public async updateState(@Body() stateReqData: StateReqData){
    await this.attendanceService.updateState(stateReqData);
    return { status: 204, message: 'success'}
  }

  //메인페이지출석
  // @Post()
  // public async doAttendance(@Query('period') location_id: number, @Body() doAttendanceReqDataDto:DoAttendanceReqData){
  //   await this.attendanceService.doAttendance(location_id,doAttendanceReqDataDto );
  //   return{ status: 204, msessage: 'success'}
  // }
}


