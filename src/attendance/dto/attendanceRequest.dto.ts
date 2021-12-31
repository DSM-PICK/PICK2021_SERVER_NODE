import { IsNumber, IsString, Length } from "class-validator";

export class AttendanceReqData{
    @IsString()
    @Length(20)
    state: string;

    @IsString()
    @Length(35)
    term: string;

    @IsString()
    reason: string;

    @IsNumber()
    student_id: number;
}