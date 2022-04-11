import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';

export class ResFilterDataArray {
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
  period: number;

  @IsString()
  location_name: string;
}

export class ResFilterData {
  @IsNumber()
  student_id: number;

  @IsString()
  student_name: string;

  @IsString()
  gcn: string;

  student_attendance: ResFilterDataArray[];
}
