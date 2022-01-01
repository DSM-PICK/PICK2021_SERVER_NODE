import { IsNumber, IsString } from "class-validator";

export class ModifyLocationDto{
    @IsNumber()
    floor: number;

    @IsNumber()
    priority: number;

    @IsString()
    name: string;
}