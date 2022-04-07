import { IsEnum, IsNumber, IsString } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';

//출결변동사항 등록
export class AttendanceReqData {
  @IsEnum([
    State.ABSENCE,
    State.FIELDEXPER,
    State.GETJOB,
    State.GOHOME,
    State.MOVE,
    State.OUTING,
  ])
  state: State;

  @IsString()
  term: string;

  @IsString()
  reason: string;

  @IsString()
  teacher_id: string;

  @IsNumber()
  student_id: number;
}
