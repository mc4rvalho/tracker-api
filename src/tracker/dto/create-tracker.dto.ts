import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { CategoriaEnum } from '../enums/categoria.enum';

export class CreateTrackerDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsEnum(CategoriaEnum)
  categoria!: CategoriaEnum;

  @IsInt()
  @Min(0)
  @Max(10)
  nota!: number;
}
