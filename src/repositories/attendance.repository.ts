import { AttendanceReqData } from 'src/attendance/dto/attendanceRequest.dto';
import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance/attendance.entity';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {

    public async checkExistAttendance(attendance_id: number): Promise<boolean>{
        const attendance = await this.createQueryBuilder('tbl_attendance')
        .select('tbl_attendance.id', 'attendance_id')
        .where('tblattendance.id = :attendance_id', {attendance_id: attendance_id})
        .getOne();
        if(attendance){
            return true;
        }
        return false;
    }
    public async get(){
        return this.createQueryBuilder('tbl_attendance')
        .innerJoinAndSelect('tbl_attedance.student_id', 'student_id')
        .innerJoinAndSelect('tbl_attendance.director_id', 'director_id')
        .addSelect('tbl_attendance.period','period')
        .addSelect('tbl_attendance.state', 'state')
        .addSelect('tbl_attendance.memo', 'memo')
        .addSelect('tbl_attendance.reason', 'reason')
        .getMany()
    }

    public async updateState(stateReqData: StateReqData){
        let state = stateReqData.state;

        return this.createQueryBuilder()
        .update(Attendance)
        .set({ state: state })
        .execute();
    }

}
