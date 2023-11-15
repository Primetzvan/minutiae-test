import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsModule } from './doors/doors.module';
import { FingersModule } from './fingers/fingers.module';
import { ConfigModule } from '@nestjs/config';
import { AccessesController } from './accesses/accesses.controller';
import { DATABASE_NAME } from './constants';
import { MqttModule } from './mqtt/mqtt.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DoorsModule,
    FingersModule,
    MqttModule,
    LogsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'mariadb',
      host: 'database',
      port: 3306,
      username: 'user',
      password: 'password',
      autoLoadEntities: true,
      synchronize: false, // DISABLE in production
    }),
  ],
  controllers: [AppController, AccessesController],
  providers: [AppService],
})
export class AppModule {}
