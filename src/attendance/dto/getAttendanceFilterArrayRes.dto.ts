import { IsEnum, IsNumber, IsString } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';

//출석 받아오기 필터링 res Dto
export class GetAttendanceFilterResDto {
  @IsString()
  location_name: string;

  @IsEnum([
    State.ABSENCE,
    State.FIELDEXPER,
    State.GETJOB,
    State.GOHOME,
    State.MOVE,
    State.OUTING,
  ])
  state: State;
}
