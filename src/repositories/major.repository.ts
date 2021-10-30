import { EntityRepository, Repository } from 'typeorm';
import { Major } from '../entities/major/major.entity';

@EntityRepository(Major)
export class MajorRepository extends Repository<Major> {}