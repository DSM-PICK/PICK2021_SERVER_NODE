import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from './attendance.entity';

@EntityRepository(Attendance)
export class AttendenceRepository extends Repository<Attendance> {}