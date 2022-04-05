import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';
import { IsNull } from 'typeorm';
import { StateReqData } from './stateRequestData.dto';

//출석하기
export class DoAttendanceReqData {
  @IsString()
  date: string;

  @IsString()
  schedule: string;

  @IsNumber()
  student_id: number;

  @IsEnum([
    State.ABSENCE,
    State.FIELDEXPER,
    State.GETJOB,
    State.GOHOME,
    State.MOVE,
    State.OUTING,
  ])
  state: State;

  @IsNumber()
  location_id: number;
}
