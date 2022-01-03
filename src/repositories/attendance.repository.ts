import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { Student } from 'src/entities/student/student.entity';
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

    //학번, 학생이름, 확인교사, 상태, 이유, 기간
    public async getAttendance(){
        return this.createQueryBuilder('tbl_attendance')
        .leftJoinAndSelect('tbl_attendance.student', 'student')
        .leftJoinAndSelect('tbl_attendance.director', 'director')
        .addSelect('tbl_attendance.term') 
        .addSelect('tbl_attendance.state')
        .addSelect('tbl_attendance.reason')
        .getMany()
    }
}
