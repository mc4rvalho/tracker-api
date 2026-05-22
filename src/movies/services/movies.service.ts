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

  async create(createMovieDto: CreateMovieDto, userId: string): Promise<Movie> {
    return this.prisma.movie.create({
      data: { ...createMovieDto, userId },
    });
  }

  async findAll(
    userId: string,
    filters?: {
      title?: string;
      category?: string;
      grade?: number;
      review?: string;
      tags?: string[];
    },
  ) {
    return this.prisma.movie.findMany({
      where: {
        userId,
        title: filters?.title || undefined,
        category: filters?.category || undefined,
        grade: filters?.grade || undefined,
        review: filters?.review || undefined,
        tags: filters?.tags ? { hasEvery: filters.tags } : undefined,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const movie = await this.prisma.movie.findFirst({ where: { id, userId } });

    if (!movie) {
      throw new NotFoundException('Movie not found or access denied');
    }

    return movie;
  }

  async searchFromTmdb(title: string) {
    return this.tmdb.searchMovie(title);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string) {
    await this.findOne(id, userId);

    const dataToUpdate: Prisma.MovieUpdateInput = { ...updateMovieDto };

    if (updateMovieDto.status === 'FINISHED') {
      dataToUpdate.finishedAt = new Date();
    }

    return this.prisma.movie.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.movie.delete({
      where: { id },
    });

    return { message: 'Movie successfully deleted' };
  }
}
