import { AffliatedAfterSchool } from 'src/entities/affliatedAfterShool/affliatedAfterSchool.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AffliatedAfterSchool)
export class AffliatedAfterSchoolRepository extends Repository<AffliatedAfterSchool> {}