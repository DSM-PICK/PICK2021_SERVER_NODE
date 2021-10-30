import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '../entities/schedule/schedule.entity';


@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {}