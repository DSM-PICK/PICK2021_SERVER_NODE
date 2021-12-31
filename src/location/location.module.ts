import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationRepository } from 'src/repositories/location.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/entities/location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, LocationRepository])],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
