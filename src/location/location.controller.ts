import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // @Get()
  // getAll(): Promise<Location>{
  //   return this.locationService.getAll();
  // }

  @Delete('/:id')
  remove(@Param('id')locationId: number){
    return this.locationService.deleteOne(locationId);
  }
  

  @Patch('/:id')
  patch(@Param('id') locationId: number, @Body()updatedate: UpdateLocationDto){
    return this.locationService.update(locationId, updatedate);
  }
}
