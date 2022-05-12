import { EntityRepository, Repository } from 'typeorm';
import { Director } from '../entities/director.entity';

@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {
  public async queryDirectorByScheduleAndFloor(
    schedule_id: number,
    floor: number,
  ) {
    return await this.createQueryBuilder('tbl_director')
      .where('tbl_director.schedule_id= :id', { id: schedule_id })
      .andWhere('tbl_director.floor= :floor', { floor: floor })
      .getOne();
  }
}
