import { AffliatedAfterSchool } from 'src/entities/affliatedAfterSchool.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AffliatedAfterSchool)
export class AffliatedAfterSchoolRepository extends Repository<AffliatedAfterSchool> {}