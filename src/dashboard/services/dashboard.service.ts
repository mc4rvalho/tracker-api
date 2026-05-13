import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotals() {
    // 1. Agregações de Soma
    const series = this.prisma.series.aggregate({
      _sum: { watchedEpisodes: true },
      where: { userId: '123456abc' },
    });

    const game = this.prisma.game.aggregate({
      _sum: { hoursPlayed: true },
      where: { userId: '123456abc' },
    });

    const book = this.prisma.book.aggregate({
      _sum: { readPages: true },
      where: { userId: '123456abc' },
    });

    // 2. Agregações de Contagem por Grupo (Status)
    const resultStatusMovie = this.prisma.movie.groupBy({
      by: ['status'],
      where: { userId: '123456abc' },
      _count: { status: true },
    });

    const resultStatusSeries = this.prisma.series.groupBy({
      by: ['status'],
      where: { userId: '123456abc' },
      _count: { status: true },
    });

    const resultStatusGame = this.prisma.game.groupBy({
      by: ['status'],
      where: { userId: '123456abc' },
      _count: { status: true },
    });

    const resultStatusBook = this.prisma.book.groupBy({
      by: ['status'],
      where: { userId: '123456abc' },
      _count: { status: true },
    });

    // 3. Execução Paralela
    const [
      resultSeries,
      resultGame,
      resultBook,
      queryStatusMovie,
      queryStatusSeries,
      queryStatusGame,
      queryStatusBook,
    ] = await Promise.all([
      series,
      game,
      book,
      resultStatusMovie,
      resultStatusSeries,
      resultStatusGame,
      resultStatusBook,
    ]);

    // 4. Consolidação dos Status
    const statusDistribution = {
      WISHLIST: 0,
      IN_PROGRESS: 0,
      FINISHED: 0,
    };

    const superArray = [
      ...queryStatusMovie,
      ...queryStatusSeries,
      ...queryStatusGame,
      ...queryStatusBook,
    ];

    superArray.forEach((item) => {
      statusDistribution[item.status] += item._count.status;
    });

    // 5. Retorno Final Limpo
    return {
      totalWatchedEpisodes: resultSeries._sum.watchedEpisodes || 0,
      totalHoursPlayed: resultGame._sum.hoursPlayed || 0,
      totalReadPages: resultBook._sum.readPages || 0,
      statusDistribution,
    };
  }

  async getRecentActivity() {
    const movie = this.prisma.movie.findMany({
      where: {
        userId: '123456abc',
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    const series = this.prisma.series.findMany({
      where: {
        userId: '123456abc',
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    const game = this.prisma.game.findMany({
      where: {
        userId: '123456abc',
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    const book = this.prisma.book.findMany({
      where: {
        userId: '123456abc',
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    // 3. Execução Paralela
    const [resultMovie, resultSeries, resultGame, resultBook] =
      await Promise.all([movie, series, book, game]);

    const movieWithType = resultMovie.map((movie) => ({
      ...movie,
      type: 'MOVIE',
    }));
    const seriesWithType = resultSeries.map((series) => ({
      ...series,
      type: 'SERIES',
    }));
    const gameWithType = resultGame.map((game) => ({ ...game, type: 'GAME' }));
    const bookWithType = resultBook.map((book) => ({ ...book, type: 'BOOK' }));

    const superArray = [
      ...movieWithType,
      ...seriesWithType,
      ...gameWithType,
      ...bookWithType,
    ];

    const recentTimeline = superArray
      .sort(
        (a: { updatedAt: Date }, b: { updatedAt: Date }) =>
          b.updatedAt.getTime() - a.updatedAt.getTime(),
      )
      .slice(0, 5);

    return recentTimeline;
  }
}
