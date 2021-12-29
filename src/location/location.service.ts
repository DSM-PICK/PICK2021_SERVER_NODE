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
    @InjectRepository(Location)
    private readonly locationRepository: LocationRepository,
  ) {}

  async getLocationlist() {
    return await this.locationRepository.find();
  }
  
  async addLocation(dto: LocationReqDto) {
    return await this.locationRepository.save({
      floor: dto.floor,
      name: dto.name,
      priority: dto.priority,
    });
  }

  async deleteLocation(location_id: number) {
    if (!(await this.locationRepository.checkExistLocation(location_id))) {
      throw notFoundLocationIdException;
    }
    return await this.locationRepository.deleteLocation(location_id);
  }

  async updateLocation(modifyLocationData: ModifyLocationDto) {
    return await this.locationRepository.updateLocation(modifyLocationData);
  }
}
