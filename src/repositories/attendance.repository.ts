
import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance/attendance.entity';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {

    public async checkExistAttendance(attendance_id: number): Promise<boolean>{
        const attendance = await this.createQueryBuilder('tbl_attendance')
        .select('tbl_attendance.id', 'attendance_id')
        .where('tbl_attendance.id = :attendance_id', {attendance_id: attendance_id})
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

    public async getAttendance(){
        return this.createQueryBuilder('tbl_attendance')
        .select('tbl_student.gcn', 'gcn')
        .addSelect('tbl_student.name', 'name')
        .addSelect('tbl_director.id', 'director_id')
        .addSelect('tbl_attendance.term', 'term')
        .addSelect('tbl_attendance.state', 'state')
        .addSelect('tbl_attendance.reason', 'reason')
        .getMany()
    }

}
