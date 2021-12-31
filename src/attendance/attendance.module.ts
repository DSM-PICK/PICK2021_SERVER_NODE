import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance/attendance.entity';
import { AttendanceRepository } from 'src/repositories/attendance.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Attendance, AttendanceRepository])],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
