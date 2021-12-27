import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmConfigModule } from "./typeorm/typeorm-config.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { LocationModule } from "./location/location.module";

@Module({
  imports: [TypeOrmConfigModule, AttendanceModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
