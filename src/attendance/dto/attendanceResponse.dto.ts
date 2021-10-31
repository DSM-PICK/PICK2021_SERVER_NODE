import { IsNumber, IsString } from "class-validator";

export class AttendanceResData{
    @IsNumber()
    student_id: number;

    @IsNumber()
    director_id: number;

    @IsNumber()
    period: number;

    @IsString()
    state: string;

    @IsString()
    memo: string;

    @IsString()
    reason: string;
}