import { IsArray, IsNumber, IsString } from 'class-validator';
import { IsNull } from 'typeorm';
import { StateReqData } from './stateRequestData.dto';

export class DoAttendanceReqData {
  @IsString()
  date: string;

  @IsString()
  schedule: string;

  @IsNumber()
  student_id: number;

  @IsString()
  state: string;

  @IsNumber()
  location_id: number;
}
