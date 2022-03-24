import {
    BadRequestException,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';
  
  export const badRequestException = new BadRequestException();
  
  export const ExistAttendanceError = new ConflictException('Attendance already exist');
  export const notFoundAttendanceIdException = new NotFoundException('attendanceId is not founded'); 