import { ModifyLocationDto } from 'src/location/dto/modifyLocation.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/location.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  public async checkExistLocation(id: number): Promise<boolean> {
    const location = await this.createQueryBuilder('tbl_location')
      .select('tbl_location.id', 'id')
      .where('tbl_location.id = :id', { id: id })
      .getRawOne();
    if (location) {
      return true;
    } else {
      return false;
    }
  }

  public async updateLocation(
    id: number,
    modifyLocationData: ModifyLocationDto,
  ) {
    let floor = modifyLocationData.floor;
    let name = modifyLocationData.name;
    let priority = modifyLocationData.priority;

    return this.createQueryBuilder('tbl_location')
      .update(Location)
      .set({ floor: floor, name: name, priority: priority })
      .where('tbl_location.id = :id', { id: id })
      .execute();
  }

  public async getFloorLocation(floor: number) {
    return this.createQueryBuilder('tbl_location')
      .select('tbl_location.id')
      .addSelect('tbl_location.name')
      .leftJoinAndSelect('tbl_location.major', 'major')
      .where('tbl_location.floor = :floor', { floor: floor })
      .getMany();
  }

  public async deleteLocation(id: number) {
    console.log(id);
    return this.createQueryBuilder('tbl_location')
      .delete()
      .where('tbl_location.id = :id', { id: id })
      .execute();
  }
}
