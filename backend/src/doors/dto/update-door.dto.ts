import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { AdditionalDoorInfo, CreateDoorDto } from './create-door.dto';

export class UpdateDoorDto extends PartialType(
  IntersectionType(CreateDoorDto, AdditionalDoorInfo),
) {}
