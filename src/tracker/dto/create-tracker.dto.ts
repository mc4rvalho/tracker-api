import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTrackerDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  categoria!: string;

  @IsInt()
  @Min(0)
  @Max(10)
  nota!: number;
}
