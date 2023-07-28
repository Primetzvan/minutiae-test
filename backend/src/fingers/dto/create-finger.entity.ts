import { IsString } from 'class-validator';

export class CreateFingerDto {
  @IsString()
  readonly userId: string;
}
