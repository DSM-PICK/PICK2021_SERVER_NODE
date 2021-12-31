import { IsNumber, IsString, Length } from "class-validator";

export class AttendanceReqData{
    @IsString()
    state: string;

    @IsString()
    term: string;

    @IsString()
    reason: string;

    @IsNumber()
    student_id: number;
}