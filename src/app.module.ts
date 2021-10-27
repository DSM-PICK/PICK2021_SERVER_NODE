import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';

@Module({
  imports: [TypeOrmConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
