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

export class CreateSeriesDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the series',
    example: 'Supernatural',
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: 'The genre or category of the series.',
    example: 'Drama/Fantasy',
  })
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({
    description: "User's personal note (0 a 10)",
    example: 9.5,
  })
  grade!: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Unique series ID in the TMDB API',
    example: 1622,
  })
  tmdbId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Image path for the poster provided by TMDB.',
    example: '/ko7bfasb42.jpg',
    required: false,
  })
  posterPath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descriptive analysis or user comments about the series.',
    example:
      'The dynamic between the brothers saves the world time and time again.',
    required: false,
  })
  review?: string;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    description: 'Array of custom tags for filter',
    example: ['Demons', 'Angels', 'Roadtrip'],
  })
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'Current progress status of the user',
    enum: Status,
    example: 'FINISHED',
    required: false,
  })
  status!: Status;

  @IsNumber()
  @ApiProperty({
    description: 'Number of episodes watched',
    example: 327,
  })
  watchedEpisodes!: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Total number of episodes released/available',
    example: 327,
  })
  totalEpisodes?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Total number of seasons in the series',
    example: 15,
  })
  seasons?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Number of seasons completed by the user',
    example: 15,
  })
  seasonsWatched?: number;
}
