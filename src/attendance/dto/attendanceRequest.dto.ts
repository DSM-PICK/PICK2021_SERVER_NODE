import { IsString, Length } from "class-validator";

export class AttendanceReqData{
    @IsString()
    @Length(20)
    state: string;

    @IsString()
    memo: string;

    @IsString()
    reason: string;
}