import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { Student } from 'src/entities/student/student.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance/attendance.entity';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {

    public async checkExistAttendance(id: number): Promise<boolean>{
        const attendance = await this.createQueryBuilder('tbl_attendance')
        .select('tbl_attendance.id', 'id')
        .where('tbl_attendance.id = :id', { id: id})
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
        .select('tbl_attendance.term') 
        .addSelect('tbl_attendance.state')
        .addSelect('tbl_attendance.reason')
        .leftJoinAndSelect('tbl_attendance.student', 'student')
        .leftJoinAndSelect('tbl_attendance.director', 'id')
        .innerJoin('tbl_attendance.teacher', 'teacher')
        .addSelect('teacher.name')
        .getMany()
    }

    public async deleteAttendance(id: number){
        console.log(id)
        return this.createQueryBuilder('tbl_attendance')
        .delete()
        .from(Attendance)
        .where('id = :id', { id: id})
        .execute()
    }
}