import { EntityRepository, Repository } from 'typeorm';
import { Major } from './major.entity';

@EntityRepository(Major)
export class MajorRepository extends Repository<Major> {}