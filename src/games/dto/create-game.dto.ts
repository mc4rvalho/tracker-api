import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Status } from '../../../generated/prisma/enums';

export class CreateGameDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  grade!: number;

  @IsNumber()
  hoursPlayed!: number;

  @IsNumber()
  rawgId!: number;

  @IsString()
  @IsOptional()
  coverPath?: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsString()
  platform!: string;

  @IsBoolean()
  @IsOptional()
  isPlatinum!: boolean;

  @IsString({ each: true })
  @IsArray()
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  status!: Status;
}
