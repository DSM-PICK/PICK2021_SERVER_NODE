import { IsNumber, IsString, Length } from "class-validator";

export class AttendanceResData{
    @IsNumber()
    student_id: number;

    @IsNumber()
    director_id: number;

    @IsNumber()
    period: number;

    @IsString()
    @Length(20)
    state: string;

    @IsString()
    memo: string;

    @IsString()
    reason: string;
}