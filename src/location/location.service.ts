import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notFoundLocationIdException } from 'src/exception/exception.location';
import { LocationRepository } from '../repositories/location.repository';
import { LocationReqDto } from './dto/location-req.dto';
import { ModifyLocationDto } from './dto/modifyLocation.dto';

@Injectable()
export class LocationService {
    constructor(
      private locationRepository: LocationRepository) {}

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

  async deleteLocation(id: number) {
    if (!await this.locationRepository.checkExistLocation(id)) {
      throw notFoundLocationIdException;
    }
    return await this.locationRepository.deleteLocation(id);
  }

  async updateLocation(id: number, modifyLocationData: ModifyLocationDto) {
    if (!(await this.locationRepository.checkExistLocation(id))) {
      throw notFoundLocationIdException;
    }
    return await this.locationRepository.updateLocation(id, modifyLocationData);
    }

  public async getFloorLocation(floor: number) {
    return await this.locationRepository.getFloorLocation(floor)
  }
}
