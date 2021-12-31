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

    public async updateState(stateReqData: StateReqData){
        let state = stateReqData.state;

        return this.createQueryBuilder()
        .update(Attendance)
        .set({ state: state })
        .execute();
    }

}
