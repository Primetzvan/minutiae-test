import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Door } from './entities/door.entity';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import * as JSZip from 'jszip';
import * as fs from 'fs';
import { clusterName } from './constants';
import * as path from 'path';
import { User } from '../users/entities/user.entity';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class DoorsService {
  constructor(
    @InjectRepository(Door)
    private readonly doorRepository: Repository<Door>,

    private readonly logsService: LogsService,
  ) {}

  findAll() {
    return this.doorRepository.find();
  }

  async findOneById(uuid: string) {
    const door = await this.doorRepository.findOne(
      { uuid: uuid },
      {
        relations: ['accessors'],
      },
    );

    if (!door) {
      throw new NotFoundException(`door #${uuid} not found`);
    }
    return door;
  }

  async create(createDoorDto: CreateDoorDto, modifier: User) {
    let door = this.doorRepository.create(createDoorDto);

    door = await this.saveDoor(door);

    this.createDoorLog(modifier, 'CREATE', door.toString(), null).catch(() => {
      console.log('No log created');
    });

    return door;
  }

  async update(uuid: string, updateDoorDto: UpdateDoorDto, modifier: User) {
    const oldDoor = await this.doorRepository.findOne(uuid);
    let door = await this.doorRepository.preload({
      uuid: uuid,
      ...updateDoorDto,
    });
    if (!door) {
      throw new NotFoundException(`Door '${uuid}' not found`);
    }
    door = await this.saveDoor(door);

    await this.createDoorLog(
      modifier,
      'UPDATE',
      door.toString(),
      oldDoor.toString(),
    ).catch(() => {
      console.log('No log created');
    });

    return door;
  }

  async saveDoor(door: Door) {
    return await this.doorRepository.save(door).catch((err) => {
      if (err && err.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            message: 'IP and doorname must be unique',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  async remove(uuid: string, modifier: User) {
    const door = await this.findOneById(uuid);

    this.createDoorLog(modifier, 'DELETE', null, door.toString()).catch(() => {
      console.log('No log created');
    });

    return this.doorRepository.remove(door);
  }

  async createZipRepo(createDoorDto: CreateDoorDto) {
    const zip = JSZip();

    await this.generateFolders(createDoorDto, zip);

    const newNodeFolder = zip.folder(
      createDoorDto.ip + '_' + createDoorDto.doorname,
    );

    const route = path.resolve(process.cwd(), './files/');

    // Add all needed files
    fs.readdir(route, (err, files) => {
      files.forEach((file) => {
        if (!file.match('installation')) {
          console.log(file);
          newNodeFolder.file(file, fs.readFileSync(route + '/' + file));
        }
      });
    });

    zip.file(
      'installationsanleitung.txt',
      fs.readFileSync(route + '/' + 'installation'),
    );
    return zip;
  }

  async generateFolders(createDoorDto: CreateDoorDto, zip: JSZip) {
    const doors = await this.findAll();
    const newDoorName = createDoorDto.doorname;
    const newDoorIp = createDoorDto.ip;

    let doorIpString = '';
    doors.forEach((door) => {
      doorIpString += door.ip + ',';
    });
    doorIpString += newDoorIp;

    doors.forEach((door) =>
      this.generateSpecificDoorFile(door.doorname, door.ip, doorIpString, zip),
    );
    this.generateSpecificDoorFile(newDoorName, newDoorIp, doorIpString, zip);
  }

  generateSpecificDoorFile(
    doorname: string,
    ip: string,
    allDoorIps: string,
    zip: JSZip,
  ) {
    const overwrite =
      '[mysqld]\n' +
      'binlog_format=ROW\n' +
      'default-storage-engine=innodb\n' +
      'innodb_autoinc_lock_mode=2\n' +
      'bind-address=0.0.0.0\n' +
      '\n' +
      '# Galera Provider Configuration\n' +
      'wsrep_on=ON\n' +
      'wsrep_provider=/usr/lib/galera/libgalera_smm.so\n' +
      '\n' +
      '# Galera Cluster Configuration\n' +
      'wsrep_cluster_name="' +
      clusterName +
      '"' +
      'wsrep_cluster_address="gcomm://' +
      allDoorIps +
      '"\n' +
      '\n' +
      '# Galera Synchronization Configuration\n' +
      'wsrep_sst_method=rsync\n' +
      '\n' +
      '# Galera Node Configuration\n' +
      'wsrep_node_address="' +
      ip +
      '"\n' +
      'wsrep_node_name="' +
      doorname +
      '"\n';

    const folder = zip.folder(ip + '_' + doorname);
    folder.file('galera.cnf', overwrite);
  }

  async createDoorLog(
    modifier: User,
    action: string,
    newVal: string,
    oldVal: string,
  ) {
    await this.logsService.createConfigLog(
      {
        action: action,
        modifiedTable: 'DOOR',
        newValue: newVal || 'NONE',
        oldValue: oldVal || 'NONE',
      },
      modifier,
    );
  }
}
