import { EntityRepository, Repository } from 'typeorm';
import { Director } from './director.entity';


@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {}