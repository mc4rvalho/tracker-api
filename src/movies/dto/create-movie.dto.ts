import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Status } from '../../../generated/prisma/enums';

export class CreateMovieDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  grade!: number;

  @IsNumber()
  tmdbId!: number;

  @IsString()
  @IsOptional()
  posterPath?: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsString({ each: true })
  @IsArray()
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  status!: Status;
}
