/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TmdbService } from '../../integrations/tmdb/tmdb.service';
import { CreateSeriesDto } from '../dto/create-series.dto';
import { UpdateSeriesDto } from '../dto/update-series.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Series } from '../../../generated/prisma/client';

@Injectable()
export class SeriesService {
  constructor(
    private readonly tmdb: TmdbService,
    private prisma: PrismaService,
  ) {}

  async create(
    createSeriesDto: CreateSeriesDto,
    userId: string,
  ): Promise<Series> {
    return this.prisma.series.create({
      data: { ...createSeriesDto, userId },
    });
  }

  async findAll(
    userId: string,
    filters?: {
      title?: string;
      category?: string;
      grade?: number;
      review?: string;
      watchedEpisodes?: number;
      totalEpisodes?: number;
      seasons?: number;
      seasonsWatched?: number;
      tags?: string[];
    },
  ) {
    return this.prisma.series.findMany({
      where: {
        userId,
        title: filters?.title || undefined,
        category: filters?.category || undefined,
        grade: filters?.grade || undefined,
        review: filters?.review || undefined,
        watchedEpisodes: filters?.watchedEpisodes || undefined,
        totalEpisodes: filters?.totalEpisodes || undefined,
        seasons: filters?.seasons || undefined,
        seasonsWatched: filters?.seasonsWatched || undefined,
        tags: filters?.tags ? { hasEvery: filters.tags } : undefined,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const series = await this.prisma.series.findFirst({
      where: { id },
    });

    if (!series) {
      throw new NotFoundException(
        'Opa, essa série não existe ou acesso negado!',
      );
    }
    return series;
  }

  async searchFromTmdb(title: string) {
    return this.tmdb.searchSeries(title);
  }

  async update(id: string, updateSeriesDto: UpdateSeriesDto, userId: string) {
    await this.findOne(id, userId);
    const dataToUpdate: Prisma.SeriesUpdateInput = {
      ...updateSeriesDto,
    };

    if (updateSeriesDto.status === 'FINISHED') {
      dataToUpdate.finishedAt = new Date();
    }

    return this.prisma.series.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.series.delete({
      where: { id },
    });

    return { message: 'Série excluída com sucesso!' };
  }
}
