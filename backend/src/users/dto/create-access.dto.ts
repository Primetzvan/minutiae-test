import { IsArray, IsString } from "class-validator";

export class CreateAccessDto {
  @IsString()
  readonly userId: string;

  @IsArray()
  readonly doorIds: string[];
}
