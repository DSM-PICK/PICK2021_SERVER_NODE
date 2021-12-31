import { floorResData } from 'src/location/dto/floorResData.dto';
import { ModifyLocationDto } from 'src/location/dto/modifyLocation.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/location/location.entity'

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
    
    public async checkExistLocation(id: number): Promise<boolean>{
        const location = await this.createQueryBuilder('location')
        .select('location.id', 'id')
        .where('loacation.id = :id', {location_id: id})
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
        .where('location.id = :id', { location_id: location_id})
        .execute();
    }

    public async updateLocation(modifyLocationData: ModifyLocationDto){
        let id = modifyLocationData.location_id;
        let floor = modifyLocationData.floor;
        let name = modifyLocationData.name;
        let priority = modifyLocationData.priority;
    

        return this.createQueryBuilder()
            .update(Location)
            .set({ floor: floor, name: name, priority: priority})
            .where('tbl_location.id = : tbl_location.id', { tbl_location_id: id})
            .execute();
    }

    public async getFloorLocation(floor: number){
        return this.createQueryBuilder('location')
            .select('tbl_location.id', 'location_id')
            .addSelect('tbl_location.name', 'name')
            .innerJoin('tbl_major.id', 'major_id')
            .where('location.floor = :floor', { floor: floor })
            .getMany();
        }
      
}