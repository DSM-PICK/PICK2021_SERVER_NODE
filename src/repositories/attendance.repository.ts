import { AttendanceReqData } from 'src/attendance/dto/attendanceRequest.dto';
import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance/attendance.entity';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {

    public async checkExistAttendance(attendance_id: number): Promise<boolean>{
        const attendance = await this.createQueryBuilder('attendance')
        .select('attendance.attendance_id', 'attendance_id')
        .where('attendance.attendance_id = :attendance_id', {attendance_id: attendance_id})
        .getOne();
        if(attendance){
            return true;
        }
        return false;
    }
    public async get(){
        return this.createQueryBuilder('attendance')
        .innerJoinAndSelect('attedance.student_id', 'student_id')
        .innerJoinAndSelect('attendance.director_id', 'director_id')
        .addSelect('attendance.period','period')
        .addSelect('attendance.state', 'state')
        .addSelect('attendance.memo', 'memo')
        .addSelect('attendance.reason', 'reason')
        .getMany()
    }

    public async updateState(stateReqData: StateReqData){
        let state = stateReqData.state;

        return this.createQueryBuilder()
        .update(Attendance)
        .set({ state: state })
        .execute();
    }

    public async updateAttendance(attendanceReqData: AttendanceReqData){
        let state = attendanceReqData.state;
        let memo = attendanceReqData.memo;
        let reason = attendanceReqData.reason;

        return this.createQueryBuilder()
            .update(Attendance)
            .set({ state: state, memo: memo, reason: reason})
            .execute();
    }

}
