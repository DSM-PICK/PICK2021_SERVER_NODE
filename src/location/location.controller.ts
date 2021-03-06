import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
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

  @Delete('/:id')
  public async deleteLocation(@Param('id') id: number){
    await this.locationService.deleteLocation(id);
    return { status: 204, message: 'success'};
  }
  
  @Patch('/:id')
  public async updateLocation(@Param('id') id: number, @Body() modifyLocationData: ModifyLocationDto){
    await this.locationService.updateLocation(id, modifyLocationData);
    return { status: 204, message: 'success'}
  }

  @Get('/:floor')
  public async getFloorLocation(@Param('floor') floor: number) {
    return this.locationService.getFloorLocation(floor);
  }
}
