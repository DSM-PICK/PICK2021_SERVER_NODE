import { EntityRepository, Repository } from 'typeorm';
import { Director } from '../entities/director.entity';

@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {}
