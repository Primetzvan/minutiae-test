import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { Door } from './entities/door.entity';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Door]), LogsModule],
  providers: [DoorsService],
  controllers: [DoorsController],
  exports: [DoorsService],
})
export class DoorsModule {}
