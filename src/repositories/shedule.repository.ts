import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  public async queryNowSchedule() {
    const date = new Date();
    return await this.findOne({
      month: date.getMonth() + 1,
      date: date.getDate(),
    });
  }
}
