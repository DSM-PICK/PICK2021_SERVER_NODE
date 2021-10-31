import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance/attendance.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AttendanceService {
    constructor(
      @InjectRepository(Attendance)
      private attendanceRepository: Repository<Attendance>
    ){}
    
    private attendance: Attendance[] = [];

    public getAll():Attendance[]{
      return this.attendance;
    }

    // public getOne(id: number): Attendance{
    //   const attendance = this.attendance.find(attendance => attendance.attendence_id == Number(id));
    //   if (!attendance){
    //     throw new NotFoundException(`useer id ${id} not found`);
    //   }
    //   return attendance;
    // }

    public async updateAttendance(id:number, AttendanceReqData){
      try{
        await this.attendanceRepository.update(id, AttendanceReqData);
      }catch(e){
        console.log('error');
      }
    }

     public async updateState(id: number, StateReqData){
       try{
         await this.attendanceRepository.update(id, StateReqData);
       }catch(e){
         console.log('error');
       }
     }
    
}
