import { EntityRepository, Repository } from 'typeorm';
import { AffliatedAfterSchool } from './affliated.entity';

@EntityRepository(AffliatedAfterSchool)
export class AffliatedAfterSchoolRepository extends Repository<AffliatedAfterSchool> {}