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
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the book',
    example: 'Atomic Habits',
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: 'The genre or category of the book',
    example: 'Productivity/Self-help',
  })
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({
    description: 'User personal rating (0 to 10)',
    example: 9.5,
  })
  grade!: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Unique identifier from the Open Library API',
    example: 'OL27364670W',
  })
  openLibraryId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Path to the book cover image',
    example: '/covers/atomic-habits.jpg',
    required: false,
  })
  coverPath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'User review or personal notes about the book',
    example: 'A great system for getting 1% better every day.',
    required: false,
  })
  review?: string;

  @IsString()
  @ApiProperty({
    description: 'The author of the book',
    example: 'James Clear',
  })
  author!: string;

  @IsNumber()
  @ApiProperty({
    description: 'Number of pages read by the user',
    example: 150,
  })
  readPages!: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Total number of pages in the book',
    example: 320,
  })
  totalPages?: number;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    description: 'Array of custom tags for filtering',
    example: ['Habits', 'Self-Improvement'],
  })
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'Current reading progress status',
    enum: Status,
    example: 'IN_PROGRESS',
    required: false,
  })
  status!: Status;

  @IsEnum(BookFormat)
  @IsOptional()
  @ApiProperty({
    description: 'The format of the book',
    enum: BookFormat,
    example: 'PHYSICAL',
    required: false,
  })
  format!: BookFormat;
}
