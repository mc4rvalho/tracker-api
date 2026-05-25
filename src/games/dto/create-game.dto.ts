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
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the game',
    example: 'Star Wars Jedi: Fallen Order',
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: 'The genre or category of the game',
    example: 'Action/Adventure',
  })
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({
    description: 'User personal rating (0 to 10)',
    example: 9.0,
  })
  grade!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Total hours played by the user',
    example: 25,
  })
  hoursPlayed!: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Total hours to beat',
    example: 50,
    required: false,
  })
  totalHoursPlayed?: number;

  @IsNumber()
  @ApiProperty({
    description: 'Unique identifier from the RAWG API',
    example: 28199,
  })
  rawgId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Path to the game cover image',
    example: '/covers/jedi-fallen-order.jpg',
    required: false,
  })
  coverPath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'User review or personal notes about the game',
    example: 'Amazing lightsaber combat mechanics.',
    required: false,
  })
  review?: string;

  @IsString()
  @ApiProperty({
    description: 'The platform where the user plays this game',
    example: 'Xbox',
  })
  platform!: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description:
      'Indicates if the user has unlocked all achievements (Platinum)',
    example: false,
    required: false,
  })
  isPlatinum!: boolean;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    description: 'Array of custom tags for filtering',
    example: ['Sci-Fi', 'Souls-like'],
  })
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'Current gameplay progress status',
    enum: Status,
    example: 'FINISHED',
    required: false,
  })
  status!: Status;
}
