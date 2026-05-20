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
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Lord of the Rings: The Fellowship of the Ring',
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: 'The genre or category of the movie',
    example: 'Fantasy',
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

  @IsNumber()
  @ApiProperty({
    description: 'Unique identifier from the TMDB API',
    example: 120,
  })
  tmdbId!: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Path to the movie poster image',
    example: '/poster/lotr.jpg',
    required: false,
  })
  posterPath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'User review or personal notes about the movie',
    example: 'A masterpiece of cinema.',
    required: false,
  })
  review?: string;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    description: 'Array of custom tags for filtering',
    example: ['Epic', 'Journey'],
  })
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'Current watch status',
    enum: Status,
    example: 'FINISHED',
    required: false,
  })
  status!: Status;
}
