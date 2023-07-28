import { Controller, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { FingersService } from '../fingers/fingers.service';
import { EnrollFinished, Match } from './dto/dtos.entity';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/constants';
import { LogStatus } from "../logs/entities/gate-log.entity";
import { LogsService } from "../logs/logs.service";


@Controller('mqtt')
@UseGuards(JwtAuthGuard)
@Public()
export class MqttController {
  constructor(
    private readonly fingersService: FingersService,
    private readonly usersService: UsersService,
    private readonly logsService: LogsService,
    @Inject('MQ_CLIENT') private client: ClientProxy,
  ) {
    client.connect();
  }

  @MessagePattern('MATCH')
  async match(@Payload() data: Match) {
    // TODO: button:true implementieren

    const user = await this.fingersService.getUserByExternalFingerId(
      data.externalFingerId,
    );

    const log = { entrant: user, event: LogStatus.OPEN, failReason: '' };
    let failReason = 'user has no access';

    const access = await this.usersService.hasAccess(user).catch(() => {
      failReason = 'Door is not in system, no access check possible';
    });

    if (access != null && access) {
      this.client.emit('UNLOCK', { keepOpen: false });
    } else {
      log.event = LogStatus.FAILED;
      log.failReason = failReason;
      console.log('no entry');
    }

    await this.logsService.createGateLog(log);
  }

  // sudo mosquitto_pub -h localhost -p 1883 -t ENROLL_FINISHED -m '{ "pattern": "ENROLL_FINISHED", "data": { "externalFingerId": "asdf", "success": "true" } }'
  @MessagePattern('ENROLL_FINISHED')
  async enroll_finished(@Payload() data: EnrollFinished) {
    await this.fingersService.changeStatus(data);
  }
}