import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finger, FingerStatus } from './entities/finger.entity';
import { User } from '../users/entities/user.entity';
import { CreateFingerDto } from './dto/create-finger.entity';
import { nanoid } from 'nanoid';
import { EnrollFinished } from '../mqtt/dto/dtos.entity';
import { LogsService } from "../logs/logs.service";

let sessionIdCache;

@Injectable()
export class FingersService {
  constructor(
    @InjectRepository(Finger)
    private readonly fingerRepository: Repository<Finger>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly logsService: LogsService,
  ) {}

  async create(createFingerDto: CreateFingerDto, modifier: User) {
    const user = await this.findUserById(createFingerDto.userId);

    if (user.finger !== null) {
      throw new BadRequestException(
        `User '${createFingerDto.userId}' already has a finger, please remove finger before creating a new one`,
      );
    }

    sessionIdCache = nanoid(10);

    const f = this.fingerRepository.create({
      sessionId: sessionIdCache,
      user: user,
      sessionExpires: new Date(Date.now() + 1000 * 60 * parseInt(process.env.CREATE_FINGER_SESSION_EXPIRES)),
    });
    await this.fingerRepository.save(f).catch((err) => {
      return err;
    });

    this.createFingerLog(modifier, 'CREATE -> START SCAN', f.toString(), null).catch(() => {
      console.log('No log created');
    });

    return sessionIdCache;
  }

  async getCreateStatus(sessionId: string) {
    const finger = await this.findFingerBySessionId(sessionId);

    if (finger.sessionExpires != null && +Date.now() > +finger.sessionExpires) {
      await this.fingerRepository.remove(finger);
      return 'expired';
    } else if (finger.status === FingerStatus.FAILED) {
      await this.fingerRepository.remove(finger);
    }

    return finger.status;
  }

  async removeBySessionId(sessionId: string) {
    const finger = await this.findFingerBySessionId(sessionId);
    return this.fingerRepository.remove(finger);
  }

  async removeForUser(userId: string, modifier: User) {
    const user = await this.findUserById(userId);
    const finger = user.finger;
    if (!finger) {
      throw new NotFoundException(`User #'${userId}' has no finger`);
    }

    const removed = this.fingerRepository.remove(finger);

    this.createFingerLog(modifier, 'DELETE', null, finger.toString()).catch(() => {
      console.log('No log created');
    });

    // remove finger
    return {
      externalFingerId: finger.externalId,
      removed: removed,
    };
  }

  private async findUserById(userId: string) {
    const user = await this.userRepository.findOne(
      {
        uuid: userId,
      },
      {
        relations: ['finger'],
      },
    );

    if (!user) {
      throw new NotFoundException(`User '${userId}' not found`);
    }
    return user;
  }

  private async findFingerBySessionId(sessionId: string) {
    const finger = await this.fingerRepository.findOne({
      sessionId: sessionId,
    });
    if (!finger) {
      throw new NotFoundException(`There is no finger with '${sessionId}'`);
    }
    return finger;
  }


  async getUserByExternalFingerId(externalId: string) {
    const finger = await this.fingerRepository.findOne({
      externalId: externalId,
    });
    if (!finger) {
      throw new NotFoundException(
        `There is no finger with externalId '${externalId}'`,
      );
    }

    return await this.userRepository
      .findOne(
        {
          finger: finger,
        },
        {
          relations: ['finger', 'accesses'],
        },
      )
      .catch(() => {
        throw new NotFoundException(
          `Finger with externalId '${externalId}' is not assigned to a user`,
        );
      });
  }

  async changeStatus(data: EnrollFinished) {
    const status = data.success ? FingerStatus.OK : FingerStatus.FAILED;

    let finger = await this.fingerRepository.findOne({
      sessionId: sessionIdCache,
    });
    if (!finger) {
      throw new NotFoundException(
        `There is no finger with sessionId '${sessionIdCache}'`,
      );
    }

    if (+Date.now() > +finger.sessionExpires) {
      await this.fingerRepository.remove(finger);
      throw new InternalServerErrorException(
        `Adding the finger process is already expired, finger with externalID #'${finger.externalId}' can be removed from fingertable2`,
      );
    }

    let newFinger = await this.fingerRepository.preload({
      uuid: finger.uuid,
      status: status,
      externalId: data.externalFingerId,
      sessionExpires: null,
    });
    newFinger = await this.fingerRepository.save(newFinger);

    await this.logsService.createConfigLog(
      {
        action: 'CREATE -> ENROLL_FINISHED',
        modifiedTable: 'FINGER',
        newValue: newFinger.toString(),
        oldValue: finger.toString(),
      },
      null,
    );

    return newFinger;
  }

  async createFingerLog(modifier: User, action: string, newVal: string, oldVal: string) {
    await this.logsService.createConfigLog(
      {
        action: action,
        modifiedTable: 'FINGER',
        newValue: newVal || 'NONE',
        oldValue: oldVal || 'NONE',
      },
      modifier,
    );
  }
}
