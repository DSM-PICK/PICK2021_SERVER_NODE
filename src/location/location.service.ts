import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notFoundLocationIdException } from 'src/exception/exception.location';
import { Location } from '../entities/location/location.entity';
import { LocationRepository } from '../repositories/location.repository';
import { LocationReqDto } from './dto/location-req.dto';
import { ModifyLocationDto } from './dto/modifyLocation.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private readonly locationRepository: LocationRepository
  ){}

  async getLocationlist(){
    return await this.locationRepository.getLocationlist()
  }

  async addLocation(dto: LocationReqDto){
    const location = new Location();

    location.floor = dto.floor;
    location.name = dto.name;
    location.priority = dto.priority;
    return await this.locationRepository.save(location);
    
  }

  async deleteLocation(location_id: number){
    if(!(await this.locationRepository.checkExistLocation(location_id))){
      throw notFoundLocationIdException;
    }
    return await this.locationRepository.deleteLocation(location_id);
  }

  async updateLocation(modifyLocationData: ModifyLocationDto){
    return await this.locationRepository.updateLocation(modifyLocationData);
  }
}
