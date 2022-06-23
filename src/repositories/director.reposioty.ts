import { EntityRepository, Repository } from 'typeorm';
import { Director } from '../entities/director.entity';

@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {
  public async queryDirectorByScheduleAndFloor(
    schedule_id: number,
    floor: number,
  ) {
    return await this.createQueryBuilder('tbl_director')
      .select('tbl_director.id', 'director_id')
      .where('tbl_director.schedule_id= :id', { id: schedule_id })
      .andWhere('tbl_director.floor= :floor', { floor: floor })
      .getOne();
  }

  public async querySchedulAndTeacher(schedule_id) {
    return await this.createQueryBuilder('tbl_director')
      .select('tbl_director.id', 'director_id')
      .where('tbl_director.schedule_id= :schedule_id', {
        schedule_id: schedule_id,
      })
      .getOne();
  }
}
