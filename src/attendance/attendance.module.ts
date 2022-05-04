import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { StudentRepository } from 'src/repositories/student.repository';
import { TeacherRepository } from 'src/repositories/teacher.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendanceRepository,
      StudentRepository,
      TeacherRepository,
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
