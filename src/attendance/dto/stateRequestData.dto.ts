import { IsString, Length } from "class-validator";

export class StateReqData{
    @IsString()
    @Length(20)
    state: string;
}