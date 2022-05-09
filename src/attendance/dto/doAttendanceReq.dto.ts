import { IsEnum, IsNumber } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';

//출석하기
export class DoAttendanceReqData {
  @IsNumber()
  period: number;

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

  location_id: number;
}
