import { EntityRepository, Repository } from 'typeorm';
import { AffliatedAfterSchool } from '../entities/affliated/affliated.entity';

@EntityRepository(AffliatedAfterSchool)
export class AffliatedAfterSchoolRepository extends Repository<AffliatedAfterSchool> {}