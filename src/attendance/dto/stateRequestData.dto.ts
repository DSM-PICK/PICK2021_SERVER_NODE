import { IsString, Length } from "class-validator";

export class StateReqData{
    @IsString()
    state: string;
}