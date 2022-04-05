import { IsNumber, IsString } from 'class-validator';
import { State } from 'src/entities/Enum/state.enum';

//출석 받아오기 필터링 res Dto
export class GetAttendanceFilterResDto {
  @IsString()
  gcn: string;

  @IsNumber()
  student_id: number;

  @IsString()
  student_name: string;
}
