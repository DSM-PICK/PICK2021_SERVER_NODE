import { StateReqData } from 'src/attendance/dto/stateRequestData.dto';
import { Director } from 'src/entities/director/director.entity';
import { Student } from 'src/entities/student/student.entity';
import { Teacher } from 'src/entities/teacher/teacher.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from '../entities/attendance/attendance.entity';
import { Location } from '../entities/location/location.entity';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {

    public async checkExistAttendance(id: number): Promise<boolean>{
        const attendance = await this.createQueryBuilder('tbl_attendance')
        .select('tbl_attendance.id', 'id')
        .where('tbl_attendance.id = :id', { id: id})
        .getRawOne()
        
        if(attendance){
            return true;
        }else{
            return false;
        }
    }

    //출결 변동 내역 상태 변경
    public async updateState(stateReqData: StateReqData){
        let state = stateReqData.state;

        return this.createQueryBuilder()
        .update(Attendance)
        .set({ state: state })
        .execute();
    }

    //오늘출결변동내역 가져오기
    public async getAttendanceToday(floor){
        return this.createQueryBuilder('tbl_attendance')
        .select([
            'tbl_attendance.id',
            'tbl_attendance.state',
            'tbl_attendance.reason',
        ])
        // .leftJoin(Location, 'location', 'location.id = tbl_attendance.location_id')
        // .where('location.floor = :floor', { floor: floor})
        .leftJoin(Student, 'student','student.id = tbl_attendance.student_id')
        .addSelect('tbl_attendance.student_id')
        .leftJoin(Director, 'director', 'director.id = tbl_attendance.director_id')
        .addSelect('tbl_attendance.director_id')
        .leftJoin(Teacher, 'teacher', 'teacher.id = tbl_attendance.teacher_id')
        .addSelect('tbl_attendance.teacher_id')
        .getMany()
    }

    //출석 삭제
    public async deleteAttendance(id: number){
        console.log(id)
        return await this.createQueryBuilder('tbl_attendance')
        .delete()
        .from(Attendance)
        .where('tbl_attendance.id=:id', { id: id})
        .execute()
    }
}
