import { OmitType } from "@nestjs/mapped-types";
import { Location } from "src/entities/location/location.entity";

export class CreateLocationDto extends OmitType(Location, ['location_id']){}
