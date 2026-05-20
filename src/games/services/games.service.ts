/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { RawgService } from '../../integrations/rawg/rawg.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';

@Injectable()
export class GamesService {
  constructor(
    private readonly rawg: RawgService,
    private prisma: PrismaService,
  ) {}

  async create(createGameDto: CreateGameDto, userId: string) {
    return this.prisma.game.create({
      data: { ...createGameDto, userId },
    });
  }

  async findAll(filters?: {
    title?: string;
    category?: string;
    grade?: number;
    hoursPlayed?: number;
    coverPath?: string;
    review?: string;
    platform?: string;
    isPlatinum?: boolean;
    tags?: string[];
  }) {
    return this.prisma.game.findMany({
      where: {
        userId: '123456abc',
        title: filters?.title || undefined,
        category: filters?.category || undefined,
        grade: filters?.grade || undefined,
        hoursPlayed: filters?.hoursPlayed || undefined,
        coverPath: filters?.coverPath || undefined,
        review: filters?.review || undefined,
        platform: filters?.platform || undefined,
        isPlatinum: filters?.isPlatinum || undefined,
        tags: filters?.tags ? { hasEvery: filters.tags } : undefined,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.game.findUnique({ where: { id } });
  }

  async searchFromRawg(title: string) {
    return this.rawg.searchGames(title);
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const dataToUpdate: Prisma.GameUpdateInput = {
      ...updateGameDto,
    };

    if (updateGameDto.status === 'FINISHED') {
      dataToUpdate.finishedAt = new Date();
    }

    return this.prisma.game.update({ where: { id }, data: dataToUpdate });
  }

  async remove(id: string) {
    try {
      await this.prisma.game.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(
        'Opa, esse jogo não existe ou já foi apagado!',
      );
    }

    return { message: 'Jogo excluído com sucesso!' };
  }
}
