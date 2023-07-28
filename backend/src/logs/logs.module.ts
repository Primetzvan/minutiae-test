import { forwardRef, Module } from "@nestjs/common";
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigLog } from "./entities/config-log.entity";
import { GateLog } from "./entities/gate-log.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigLog, GateLog]),
    forwardRef(() => UsersModule),
  ],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService],
})
export class LogsModule {}
