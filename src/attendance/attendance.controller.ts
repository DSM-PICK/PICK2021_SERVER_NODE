import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { State } from 'src/entities/Enum/state.enum';
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
  @Get('/today')
  public async getAttendanceToday(@Query('floor', ParseIntPipe) floor: number) {
    return await this.attendanceService.getAttendanceToday(floor);
  }

  //출석 조회(필터링)
  @Get('/filter')
  public async getAttendanceFilter(
    @Query('month') month: number,
    @Query('date') date: number,
    @Query('state') state: State,
    @Query('floor', ParseIntPipe) floor: number,
  ) {
    return await this.attendanceService.getAttendanceFilter(
      month,
      date,
      state,
      floor,
    );
  }

  //출석하기
  @Patch('/:attendance_id')
  public async doAttendance(
    @Param('attendance_id') attendance_id,
    @Body() doAttendanceReqDto: DoAttendanceReqData,
  ) {
    await this.attendanceService.updateAttendance(
      attendance_id,
      doAttendanceReqDto,
    );
    return { status: 204, msessage: 'success' };
  }

  //출석 조회가져오기
  @Get('/:location_id')
  public async getAttendance(@Param('location_id') location_id: number) {
    return await this.attendanceService.bringAttendance(location_id);
  }
}
