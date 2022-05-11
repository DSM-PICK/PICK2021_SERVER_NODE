import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ScheduleName } from 'src/entities/Enum/scheduleName.enum';
import { State } from 'src/entities/Enum/state.enum';

export class StudentAttendance {
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

export class StudentList {
  @IsNumber()
  student_id: number;

  @IsString()
  student_name: string;

  @IsString()
  gcn: string;

  student_attendance: StudentAttendance[];
}

export class ResAttendance {
  @IsEnum([
    ScheduleName.AFTER_SCHOOL,
    ScheduleName.MAJOR,
    ScheduleName.SELF_STUDY,
  ])
  schedule: ScheduleName;

  @IsString()
  class_name: string;

  head_name: string;

  student_list: StudentList[];
}
