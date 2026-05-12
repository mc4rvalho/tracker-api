import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BookFormat, Status } from '../../../generated/prisma/enums';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  grade!: number;

  @IsString()
  openLibraryId!: string;

  @IsString()
  @IsOptional()
  coverPath?: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsString()
  author!: string;

  @IsNumber()
  readPages!: number;

  @IsNumber()
  totalPages!: number;

  @IsString({ each: true })
  @IsArray()
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  status!: Status;

  @IsEnum(BookFormat)
  @IsOptional()
  format!: BookFormat;
}
