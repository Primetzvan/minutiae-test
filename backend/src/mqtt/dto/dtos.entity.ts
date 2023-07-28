import { IsBoolean, IsInt, IsString } from 'class-validator';

export class Match {
  @IsString()
  readonly externalFingerId: string;

  @IsInt()
  score: number;

  @IsBoolean()
  readonly button: boolean;
}

export class EnrollFinished {
  @IsString()
  readonly externalFingerId: string;

  @IsBoolean()
  readonly success: boolean;
}
