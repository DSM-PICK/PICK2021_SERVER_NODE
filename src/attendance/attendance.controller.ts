import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { DoAttendanceReqData } from './dto/doAttendanceReq.dto';
import { StateReqData } from './dto/stateRequestData.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  //출석 삭제
  @Delete('/:id')
  public async deleteAttendance(@Param('id') id: number) {
    await this.attendanceService.deleteAttendance(id);
    return { status: 204, message: 'success' };
  }

  //출결변동사항 등록
  // (new ParseArrayPipe({ items: AttendanceReqData })) attendanceReqData:AttendanceReqData
  @Post()
  public async postAttendance(@Body() attendanceReqData: AttendanceReqData[]) {
    console.log(attendanceReqData);
    await this.attendanceService.postAttendance(attendanceReqData);
    return { status: 201, message: 'success' };
  }

  //출석변동내역상태변경
  @Patch('/state')
  public async updateState(@Body() stateReqData: StateReqData) {
    await this.attendanceService.updateState(stateReqData);
    return { status: 204, message: 'success' };
  }

  //오늘출결변동내역 가져오기
  @Get()
  public async getAttendanceToday(
    @Query('floor', ParseIntPipe) floor: number,
    @Query('date') date: Date,
  ) {
    return await this.attendanceService.getAttendanceToday(floor, date);
  }

  //출석 조회(필터링)
  @Get()
  public async getAttendanceFilter(
    @Query('date') date: string,
    @Query('state') state: string,
    @Query('floor') floor: number,
  ) {
    return await this.attendanceService.getAttendanceFilter(date, state, floor);
  }

  //출석하기
  @Post()
  public async doAttendance(
    @Query('period') location_id: number,
    @Body() doAttendanceReqDto: DoAttendanceReqData,
  ) {
    await this.attendanceService.doAttendance(location_id, doAttendanceReqDto);
    return { status: 204, msessage: 'success' };
  }

  //출석 가져오기
  @Get()
  public async bringAttendance(@Query('period') location_id: number) {
    await this.attendanceService.bringAttendance(location_id);
    return { status: 204, message: 'success' };
  }
}
