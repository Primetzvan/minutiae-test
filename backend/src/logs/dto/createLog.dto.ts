import { IsEnum, IsObject, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { LogStatus } from '../entities/gate-log.entity';

export class CreateConfigLogDto {
  @IsString()
  action: string;

  @IsString()
  modifiedTable: string;

  @IsString()
  oldValue: string;

  @IsString()
  newValue: string;
}

export class CreateGateLogDto {
  @IsObject()
  readonly entrant: User;

  @IsEnum(LogStatus)
  readonly event: LogStatus;

  @IsString()
  readonly failReason: string;
}
