import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [TypeOrmConfigModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
