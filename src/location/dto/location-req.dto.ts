import { IsNumber, IsString } from 'class-validator';

export class LocationReqDto {
  @IsNumber()
  floor: number;

  @IsNumber()
  priority: number;

  @IsString()
  name: string;
}
