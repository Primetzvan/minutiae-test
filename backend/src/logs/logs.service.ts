import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigLog } from "./entities/config-log.entity";
import { GateLog } from "./entities/gate-log.entity";
import { CreateConfigLogDto, CreateGateLogDto } from "./dto/createLog.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { Door } from "../doors/entities/door.entity";
import { forwardRef, Inject } from "@nestjs/common";

export class LogsService {

  constructor(
    @InjectRepository(ConfigLog)
    private readonly configLogRepository: Repository<ConfigLog>,

    @InjectRepository(GateLog)
    private readonly gateLogsRepository: Repository<GateLog>,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}


  findAllConfig() {
    return this.configLogRepository.find();
  }

  findAllGate() {
    return this.gateLogsRepository.find();
  }

  async createConfigLog(createConfigLogDto: CreateConfigLogDto, modifier: User) {
    const door = await this.userService
      .findActualRaspberryInDoortable()
      .then(() => {
      return '{ #' + door.uuid + ', name: ' + door.doorname + ', IP: ' + door.ip + ' }';
      })
      .catch(() => {
        return 'Door not in the system';
      });

    const logDto = {
      ...createConfigLogDto,
      modifiedOnDoor: door,
      modifier: modifier != null ? '{ #' + modifier.uuid + ', username: ' + modifier.username + ' }' : null,
    };

    const log = this.configLogRepository.create(logDto);
    return this.configLogRepository.save(log);
  }
  async createGateLog(createGateLogDto: CreateGateLogDto) {
    const door = await this.userService.findActualRaspberryInDoortable().catch((err) => {
      console.log(err)
    });
    const user = createGateLogDto.entrant;

    const logDto = {
      ...createGateLogDto,
      entrant: '{ #' + user.uuid + ', name: ' + user.username + ' }',
      door: (door instanceof Door) ? '{ #' + door.uuid + ', name: ' + door.doorname + ', IP: ' + door.ip + ' }' : 'Door IP not in system',
    };

    const log = this.gateLogsRepository.create(logDto);
    return this.gateLogsRepository.save(log);
  }
}
