import { EntityRepository, Repository } from 'typeorm';
import { Attendence } from './attendence.entity';

@EntityRepository(Attendence)
export class AttendenceRepository extends Repository<Attendence> {}