import { Injectable } from '@nestjs/common';
import { last } from 'rxjs';
import { AfterSchool } from 'src/entities/afterschool.entity';
import { Attendance } from 'src/entities/attendance.entity';
import { Director } from 'src/entities/director.entity';
import { ScheduleName } from 'src/entities/Enum/scheduleName.enum';
import { Location } from 'src/entities/location.entity';
import { Major } from 'src/entities/major.entity';
import { Schedule } from 'src/entities/schedule.entity';
import {
  notFoundAttendanceIdException,
  notFoundAttendanceLocationIdException,
} from 'src/exception/exception.attendance';
import { AttendanceRepository } from 'src/repositories/attendance.repository';
import { DirectorRepository } from 'src/repositories/director.reposioty';
import { LocationRepository } from 'src/repositories/location.repository';
import { MajorRepository } from 'src/repositories/major.repository';
import { ScheduleRepository } from 'src/repositories/shedule.repository';
import { StudentRepository } from 'src/repositories/student.repository';
import { TeacherRepository } from 'src/repositories/teacher.repository';
import { StudentAttendance } from 'src/repositories/vo/student/studentAttendance.vo';
import { StudentInfo } from 'src/repositories/vo/student/studentInfo.vo';
import { AttendanceReqData } from './dto/attendanceRequest.dto';
import { ResFilterData } from './dto/resFilterData.dto';
import { StateReqData } from './dto/stateRequestData.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly studentRepository: StudentRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly majorRepository: MajorRepository,
    private readonly directorRepository: DirectorRepository,
    private readonly locationRepository: LocationRepository,
  ) {}

  //출석 삭제
  public async deleteAttendance(id: number) {
    if (!(await this.attendanceRepository.checkExistAttendance(id))) {
      throw notFoundAttendanceIdException;
    }

    return await this.attendanceRepository.deleteAttendance(id);
  }

  //출결변동내역 등록
  public async postAttendance(attendanceReqData: AttendanceReqData[]) {
    return attendanceReqData.map(async (item) => {
      const { state, term, reason, student_id, teacher_id } = item;
      let firstperiod = Number(item.term.substring(11, 1));
      let lastperiod = Number(item.term.substring(24));

      const student = await this.studentRepository.findOne({ id: student_id });
      const teacher = await this.teacherRepository.findOne({ id: teacher_id });

      for (firstperiod; firstperiod <= lastperiod; firstperiod++) {
        await this.attendanceRepository.save({
          term: term,
          reason: reason,
          student: student,
          teacher: teacher,
          state: state,
          period: firstperiod,
        } as Attendance);
      }
    });
  }

  //출석 상태 변경
  public async updateState(stateReqData: StateReqData) {
    return await this.attendanceRepository.updateState(stateReqData);
  }

  //출석하기
  public async updateAttendance(attendance_id, doAttendanceReqDto) {
    return await this.attendanceRepository.updateAttendance(
      attendance_id,
      doAttendanceReqDto,
    );
  }

  //오늘출결변동내역 가져오기
  public async getAttendanceToday(floor, date) {
    return await this.attendanceRepository.getAttendanceToday(floor, date);
  }

  //출석조회 가져오기(필터링)
  public async getAttendanceFilter(
    date,
    state,
    floor,
  ): Promise<ResFilterData[]> {
    const arrayIndex = [];
    const array = [];
    const studentAttendance = [];
    const student = await this.attendanceRepository
      .createQueryBuilder('tbl_attendance')
      .leftJoin('tbl_attendance.student', 'student')
      .leftJoin('tbl_attendance.director', 'director')
      .leftJoin('director.schedule', 'schedule')
      .leftJoin('student.location', 'location')
      .select('student.id', 'student_id')
      .addSelect('student.name', 'student_name')
      .addSelect('student.gcn', 'gcn')
      .addSelect('tbl_attendance.period', 'period')
      .addSelect('tbl_attendance.state', 'state')
      .addSelect('location.name', 'location_name')
      .where('schedule.date=:date', { date: date })
      .andWhere('tbl_attendance.state= :state', { state: state })
      .andWhere('location.floor= :floor', { floor: floor })
      .orderBy('student.id', 'ASC')
      .addOrderBy('tbl_attendance.period', 'ASC')
      .getRawMany();

    let index = -1;
    for (let i = 0; i < student.length; i++) {
      if (arrayIndex.indexOf(student[i].student_id) === -1) {
        arrayIndex.push(student[i].student_id);
        array.push({
          id: student[i].student_id,
          name: student[i].student_name,
          gcn: student[i].gcn,
        });
        studentAttendance.push(
          new Array({
            period: student[i].period,
            state: student[i].state,
            location_name: student[i].location_name,
          }),
        );
        index += 1;
      } else {
        studentAttendance[index].push({
          period: student[i].period,
          state: student[i].state,
          location_name: student[i].location_name,
        });
      }
    }

    const studentFilterResponse: ResFilterData[] = [];

    for (let i = 0; i < array.length; i++) {
      studentFilterResponse.push({
        student_id: array[i].id,
        student_name: array[i].name,
        gcn: array[i].gcn,
        student_attendance: studentAttendance[i],
      });
    }

    return studentFilterResponse;
  }

  //출석 가져오기
  public async bringAttendance(location_id: number) {
    if (
      !(await this.attendanceRepository.checkExistAttendanceLocation(
        location_id,
      ))
    ) {
      throw notFoundAttendanceLocationIdException;
    }
    const schedule: Schedule = await this.scheduleRepository.queryNowSchedule();
    const location: Location = await this.locationRepository.findOne({
      id: location_id,
    });
    const director: Director =
      await this.directorRepository.queryDirectorByScheduleAndFloor(
        schedule.id,
        location.floor,
      );
    switch (schedule.name) {
      case ScheduleName.MAJOR:
        const major: Major = await this.majorRepository.findOne({
          location: location,
        });

        const studentList: StudentInfo[] =
          await this.studentRepository.queryStudentInfo(major.id);

        const tmp: StudentAttendance[] =
          await this.studentRepository.queryStudentAttendance(
            director.id,
            major.id,
          );

        const studentAttendance = studentList.map((student) => {
          return {
            gcn: student.gcn,
            student_id: student.id,
            student_name: student.name,
            student_attendance: tmp
              .filter((dummy) => student.id === dummy.id)
              .map((item) => {
                return {
                  period: item.period,
                  location_name: item.locationName,
                  state: item.state,
                };
              }),
          };
        });

        return {
          schedule: 'MAJOR',
          location_name: location.name,
          class_name: major.name,
          head_name: major.getHeadName(),
          student_list: studentAttendance,
        };

      case ScheduleName.AFTER_SCHOOL:
        break;

      case ScheduleName.SELF_STUDY:
        break;
    }
  }
}
