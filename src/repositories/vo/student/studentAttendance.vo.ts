export class StudentAttendance {
  constructor(id: number, period: number, locationName: string, state: string) {
    this.id = id;
    this.period = period;
    this.locationName = locationName;
    this.state = state;
  }

  id: number;
  period: number;
  locationName: string;
  state: string;
}
