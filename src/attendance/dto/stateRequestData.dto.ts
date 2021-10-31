import { IsString } from "class-validator";

export class StateReqData{
    @IsString()
    state: string;
}