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
    description: 'O título da série',
    example: 'Supernatural',
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: 'O gênero ou categoria da série',
    example: 'Drama/Fantasia',
  })
  category!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({
    description: 'Nota pessoal do usuário (0 a 10)',
    example: 9.5,
  })
  grade!: number;

  @IsNumber()
  @ApiProperty({
    description: 'ID único da série na API do TMDB',
    example: 1622,
  })
  tmdbId!: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Caminho da imagem do poster fornecido pelo TMDB',
    example: '/ko7bfasb42.jpg',
    required: false,
  })
  posterPath?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Análise descritiva ou comentários do usuário sobre a série',
    example: 'A dinâmica entre os irmãos salva o mundo repetidas vezes.',
    required: false,
  })
  review?: string;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    description: 'Array de tags personalizadas para filtro',
    example: ['Demônios', 'Anjos', 'Roadtrip'],
  })
  tags!: string[];

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    description: 'Status atual de progresso do usuário',
    enum: Status,
    example: 'FINISHED',
    required: false,
  })
  status!: Status;

  @IsNumber()
  @ApiProperty({
    description: 'Quantidade de episódios já assistidos',
    example: 327,
  })
  watchedEpisodes!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Total de episódios lançados/disponíveis',
    example: 327,
  })
  totalEpisodes!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Quantidade total de temporadas da série',
    example: 15,
  })
  seasons!: number;

  @IsNumber()
  @ApiProperty({
    description: 'Quantidade de temporadas já concluídas pelo usuário',
    example: 15,
  })
  seasonsWatched!: number;
}
