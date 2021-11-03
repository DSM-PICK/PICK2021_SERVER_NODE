import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location/location.entity';
import { LocationRepository } from '../repositories/location.repository';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly location: Repository<LocationRepository>
  ){}
  
  async deleteOne(id:number): Promise<void>{
    try{
      await this.location.delete(id);
    }catch(e){
      console.log('error')
    }
  }

  async update(id: number, updateData): Promise<void>{
    try{
      await this.location.update(id, updateData);
    }catch(e){
      console.log('error');
    }
  }
}
