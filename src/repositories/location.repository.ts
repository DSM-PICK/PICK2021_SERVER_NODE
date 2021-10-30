import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/location/location.entity'

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {}