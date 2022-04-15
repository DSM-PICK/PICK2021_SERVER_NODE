import { IsEnum, IsNumber } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';

//상태변경데이터
export class StateReqData {
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
  id: number;
}
