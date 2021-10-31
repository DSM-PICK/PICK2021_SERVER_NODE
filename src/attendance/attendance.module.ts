import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRepository])],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
