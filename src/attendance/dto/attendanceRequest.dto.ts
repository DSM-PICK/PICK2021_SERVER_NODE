import { IsString } from "class-validator";

export class AttendanceReqData{
    @IsString()
    state: string;

    @IsString()
    memo: string;

    @IsString()
    reason: string;
}