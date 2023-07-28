import { IsHexColor, IsIP, IsString } from 'class-validator';

export class CreateDoorDto {
  @IsString()
  readonly doorname: string;

  @IsIP()
  readonly ip: string;
}

export class AdditionalDoorInfo {
  @IsHexColor()
  readonly color: string;
}
