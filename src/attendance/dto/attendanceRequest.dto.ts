import { IsNumber, IsString } from "class-validator";

export class AttendanceReqData{
    @IsString()
    teacher_id: string;

    @IsString()
    state: string;

    @IsString()
    term: string;

    @IsString()
    reason: string;

    @IsNumber()
    student_id: number;
}