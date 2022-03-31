import { IsNumber, IsString } from "class-validator";

export class DoAttendanceReqData{
    @IsString()
    date: string;

    @IsString()
    schedule: string;

}