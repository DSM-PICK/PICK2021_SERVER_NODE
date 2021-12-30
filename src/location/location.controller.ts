import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocationReqDto } from './dto/location-req.dto';
import { LocationService } from './location.service';
import { ModifyLocationDto } from './dto/modifyLocation.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/list')
  public async getlocationlist(){
    return await this.locationService.getLocationlist();
  }

  @Post()
  public async addLocation(@Body()locationReqData: LocationReqDto){
    await this.locationService.addLocation(locationReqData);
    return { status :201, message: 'success'};
  }

  @Delete()
  public async deleteLocation(@Body() location_id: number){
    await this.locationService.deleteLocation(location_id);
    return { status: 204, message: 'success'};
  }
  
  @Patch('/:id')
  public async updateLocation(@Body() modifyLocationData: ModifyLocationDto){
    await this.locationService.updateLocation(modifyLocationData);
    return { status: 204, message: 'success'}
  }
}
