import { EntityRepository, Repository } from 'typeorm';
import { AfterSchool } from '../entities/afterschool.entity';

@EntityRepository(AfterSchool)
export class AfterSchoolRepository extends Repository<AfterSchool> {}