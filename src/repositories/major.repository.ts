import { identity } from 'rxjs';
import { EntityRepository, Repository } from 'typeorm';
import { Major } from '../entities/major.entity';

@EntityRepository(Major)
export class MajorRepository extends Repository<Major> {
  public async getMajorByLocationId(location_id: number) {
    let majorInfo = await this.createQueryBuilder('tbl_major')
      .where('location.id= :id', { id: location_id })
      .addSelect('tbl_major.name', 'name')
      .addSelect('tbl_major.head_id', 'head_id')
      .addSelect('tbl_major.id', 'id')
      .getOne();

    return {
      id: majorInfo.id,
      class_name: majorInfo.name,
      head_name: majorInfo.student.name,
    };
  }
}
