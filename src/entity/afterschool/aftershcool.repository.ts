import { EntityRepository, Repository } from 'typeorm';
import { AfterSchool } from './afterschool.entity';

@EntityRepository(AfterSchool)
export class AfterSchoolRepository extends Repository<AfterSchool> {}