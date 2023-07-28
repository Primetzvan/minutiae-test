import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { AdditionalUserInfo, CreateUserDto } from './create-user.dto';

// PartialType makes values Optional
// IntersectionType combines 2 classes to one
export class UpdateUserDto extends PartialType(
  IntersectionType(CreateUserDto, AdditionalUserInfo),
) {}
