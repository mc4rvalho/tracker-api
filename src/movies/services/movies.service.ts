/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TmdbService } from '../../integrations/tmdb/tmdb.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Movie, Prisma } from '../../../generated/prisma/client';

@Injectable()
export class MoviesService {
  constructor(
    private readonly tmdb: TmdbService,
    private prisma: PrismaService,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.prisma.movie.create({
      data: { ...createMovieDto, userId: '123456abc' },
    });
  }

  async findAll(filters?: {
    title?: string;
    category?: string;
    grade?: number;
    review?: string;
    tags?: string[];
  }) {
    return this.prisma.movie.findMany({
      where: {
        userId: '123456abc',
        title: filters?.title || undefined,
        category: filters?.category || undefined,
        grade: filters?.grade || undefined,
        review: filters?.review || undefined,
        tags: filters?.tags ? { hasEvery: filters.tags } : undefined,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async searchFromTmdb(title: string) {
    return this.tmdb.searchMovie(title);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const dataToUpdate: Prisma.MovieUpdateInput = { ...updateMovieDto };

    if (updateMovieDto.status === 'FINISHED') {
      dataToUpdate.finishedAt = new Date();
    }

    return this.prisma.movie.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.movie.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(
        'Opa, esse filme não existe ou já foi apagado!',
      );
    }

    return { message: 'Filme excluído com sucesso!' };
  }
}
