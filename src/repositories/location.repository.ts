import { ModifyLocationDto } from 'src/location/dto/modifyLocation.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/location/location.entity'

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
    
    public async checkExistLocation(id: number): Promise<boolean>{
        const location = await this.createQueryBuilder('tbl_location')
        .select('tbl_location.id', 'id')
        .where('tbl_loacation.id = :id', {location_id: id})
        .getOne();
        if(location){
            return true;
        }
        return false;
    }

    public async deleteLocation(location_id:number){
        return this.createQueryBuilder('tbl_location')
        .delete()
        .from(Location)
        .where('tbl_location.id = :id', { location_id: location_id})
        .execute();
    }

    public async updateLocation(id: number, modifyLocationData: ModifyLocationDto){
        let floor = modifyLocationData.floor;
        let name = modifyLocationData.name;
        let priority = modifyLocationData.priority;
    

        return this.createQueryBuilder('tbl_location') 
            .update(Location)
            .set({ floor: floor, name: name, priority: priority})
            .where('tbl_location.id = : tbl_location.id', { tbl_location_id: id})
            .execute();
    }

    public async getFloorLocation(floor: number){
        return this.createQueryBuilder('tbl_location')
            .select('tbl_location.id')
            .addSelect('tbl_location.name')
            .leftJoinAndSelect('tbl_location.major', 'major')
            .where('tbl_location.floor = :floor', { floor: floor })
            .getMany()
        }
}