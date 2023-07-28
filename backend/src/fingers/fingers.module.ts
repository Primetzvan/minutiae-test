import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finger } from './entities/finger.entity';
import { FingersService } from './fingers.service';
import { FingersController } from './fingers.controller';
import { User } from '../users/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LogsModule } from "../logs/logs.module";
import { Fingerprint } from "../externalFinger/entities/fingerprint.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Finger, Fingerprint, User]),
    ClientsModule.register([
      {
        name: 'MQ_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: 'http://mosquitto:1883',
        },
      },
    ]),
    LogsModule,
  ],
  providers: [FingersService],
  controllers: [FingersController],
  exports: [FingersService],
})
export class FingersModule {}
