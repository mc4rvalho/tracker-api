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
    const details = await this.rawg.getGameDetails(createGameDto.rawgId);
    return this.prisma.game.create({
      data: {
        ...createGameDto,
        userId,
        totalHoursPlayed: details.playtime,
      },
    });
  }

  async findAll(
    userId: string,
    filters?: {
      title?: string;
      category?: string;
      grade?: number;
      hoursPlayed?: number;
      coverPath?: string;
      review?: string;
      platform?: string;
      isPlatinum?: boolean;
      tags?: string[];
    },
  ) {
    return this.prisma.game.findMany({
      where: {
        userId,
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

  async findOne(id: string, userId: string) {
    const game = await this.prisma.game.findUnique({ where: { id, userId } });

    if (!game) {
      throw new NotFoundException('Game not found or access denied');
    }
    return game;
  }

  async searchFromRawg(title: string) {
    return this.rawg.searchGames(title);
  }

  async update(id: string, updateGameDto: UpdateGameDto, userId: string) {
    await this.findOne(id, userId);

    const dataToUpdate: Prisma.GameUpdateInput = {
      ...updateGameDto,
    };

    if (updateGameDto.status === 'FINISHED') {
      dataToUpdate.finishedAt = new Date();
    }

    return this.prisma.game.update({ where: { id }, data: dataToUpdate });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.game.delete({
      where: { id },
    });

    return { message: 'Game successfully deleted' };
  }
}
