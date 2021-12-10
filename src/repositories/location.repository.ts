import { ModifyLocationDto } from 'src/location/dto/modifyLocation.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/location/location.entity'

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {

    public async getLocationlist(){
        return this.createQueryBuilder('location')
        .innerJoin('location.major_id', 'major_id')
        .select('location.id', 'id')
        .select('location.floor', 'floor')
        .select('location.priority','priority')
        .select('location.name', 'name')
        .getMany()
    }
    public async checkExistLocation(location_id: number): Promise<boolean>{
        const location = await this.createQueryBuilder('location')
        .select('location.location_id', 'location_id')
        .where('loacation.location_id = :location_id', {location_id: location_id})
        .getOne();
        if(location){
            return true;
        }
        return false;
    }

    public async deleteLocation(location_id:number){
        return this.createQueryBuilder('location')
        .delete()
        .from(Location)
        .where('location_id = :location_id', { location_id: location_id})
        .execute();
    }

    public async updateLocation(modifyLocationData: ModifyLocationDto){
        let floor = modifyLocationData.floor;
        let name = modifyLocationData.name;
        let priority = modifyLocationData.priority;

        return this.createQueryBuilder()
            .update(Location)
            .set({ floor: floor, name: name, priority: priority})
            .where('location.location_id = :location_id, {location_id: location}')
            .execute();

    }
}