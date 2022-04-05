import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { Student } from 'src/entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Director } from 'src/entities/director.entity';
import { DoAttendanceReqData } from 'src/attendance/dto/doAttendanceReq.dto';

import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { Location } from 'src/entities/location.entity';
import { State } from 'src/entities/Enum/state.enum';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {
  public async checkExistAttendance(id: number): Promise<boolean> {
    const attendance = await this.createQueryBuilder('tbl_attendance')
      .select('tbl_attendance.id', 'id')
      .where('tbl_attendance.id = :id', { id: id })
      .getRawOne();

    if (attendance) {
      return true;
    } else {
      return false;
    }
  }

  //출결 변동 내역 상태 변경
  public async updateState(stateReqData: StateReqData) {
    let state = stateReqData.state;

    return (
      this.createQueryBuilder()
        .update(Attendance)
        // .set({ state: State })
        .execute()
    );
  }

  //출석 삭제
  public async deleteAttendance(id: number) {
    console.log(id);
    return await this.createQueryBuilder('tbl_attendance')
      .delete()
      .from(Attendance)
      .where('tbl_attendance.id= :id', { id: id })
      .execute();
  }

  //오늘출결변동내역 가져오기
  public async getAttendanceToday(floor: number, date: Date) {
    return await this.createQueryBuilder('tbl_attendance')
      .select([
        'tbl_attendance.id',
        'tbl_attendance.state',
        'tbl_attendance.reason',
      ])
      .leftJoinAndSelect('tbl_attendance.student', 'student')
      .leftJoin('tbl_attendance.director', 'director')
      .addSelect('director.id')
      .leftJoinAndSelect('director.schedule', 'schedule')
      .leftJoin('tbl_attendance.teacher', 'teacher')
      .addSelect(['teacher.id', 'teacher.name'])
      .leftJoin('tbl_attendance.location', 'location')
      .addSelect(['location.floor', 'location.name'])
      .where('location.floor= :floor', { floor: floor })
      .andWhere('schedule.date= :date', { date: date })
      .getMany();
  }

  //출석조회 가져오기(필터링)
  public async getAttendanceFilter(date, state, floor) {
    return await this.createQueryBuilder('tbl_attendance')
      .leftJoinAndSelect('tbl_attendance.student', 'student')
      .leftJoin('tbl_attendance.location', 'location')
      .where('state= :state', { state: state })
      .where('location.floor= :floor', { floor: floor })
      .getMany();
  }

  //출석 하기
  public async doAttendance(location_id, doAttendanceReqDto) {
    let newAttendance: Attendance;

    newAttendance = this.create({});
    let attendance = await this.save(newAttendance);

    return attendance;
  }

  //출석가져오기
  public async bringAttendance(location_id) {}
}
