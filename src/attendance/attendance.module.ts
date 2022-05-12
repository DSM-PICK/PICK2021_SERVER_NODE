import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { StudentRepository } from 'src/repositories/student.repository';
import { TeacherRepository } from 'src/repositories/teacher.repository';
import { ScheduleRepository } from 'src/repositories/shedule.repository';
import { MajorRepository } from 'src/repositories/major.repository';
import { DirectorRepository } from 'src/repositories/director.reposioty';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendanceRepository,
      StudentRepository,
      TeacherRepository,
      ScheduleRepository,
      StudentRepository,
      MajorRepository,
      DirectorRepository,
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
