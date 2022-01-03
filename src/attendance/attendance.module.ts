import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceRepository } from 'src/repositories/attendance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRepository])],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
