import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotals(userId: string) {
    // 1. Sum Aggregations
    const series = this.prisma.series.aggregate({
      _sum: { watchedEpisodes: true },
      where: { userId },
    });

    const game = this.prisma.game.aggregate({
      _sum: { hoursPlayed: true },
      where: { userId },
    });

    const book = this.prisma.book.aggregate({
      _sum: { readPages: true },
      where: { userId },
    });

    // 2. Aggregations of Counts by Group (Status)
    const resultStatusMovie = this.prisma.movie.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });

    const resultStatusSeries = this.prisma.series.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });

    const resultStatusGame = this.prisma.game.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });

    const resultStatusBook = this.prisma.book.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });

    // 3. Parallel Execution
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

    // 4. Consolidation of Status
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

    // 5. Final Clean Return
    return {
      totalWatchedEpisodes: resultSeries._sum.watchedEpisodes || 0,
      totalHoursPlayed: resultGame._sum.hoursPlayed || 0,
      totalReadPages: resultBook._sum.readPages || 0,
      statusDistribution,
    };
  }

  async getRecentActivity(userId: string) {
    const movie = this.prisma.movie.findMany({
      where: { userId },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    const series = this.prisma.series.findMany({
      where: { userId },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    const game = this.prisma.game.findMany({
      where: { userId },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    const book = this.prisma.book.findMany({
      where: { userId },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    // 3. Parallel Execution
    const [resultMovie, resultSeries, resultGame, resultBook] =
      await Promise.all([movie, series, game, book]);

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

  async getAnalytics(userId: string) {
    const movie = this.prisma.movie.findMany({
      where: { userId },
      select: {
        grade: true,
        tags: true,
      },
    });

    const series = this.prisma.series.findMany({
      where: { userId },
      select: {
        grade: true,
        tags: true,
      },
    });

    const game = this.prisma.game.findMany({
      where: { userId },
      select: {
        grade: true,
        tags: true,
      },
    });

    const book = this.prisma.book.findMany({
      where: { userId },
      select: {
        grade: true,
        tags: true,
      },
    });

    // 3. Parallel Execution
    const [resultMovie, resultSeries, resultGame, resultBook] =
      await Promise.all([movie, series, game, book]);

    const superArray = [
      ...resultMovie,
      ...resultSeries,
      ...resultGame,
      ...resultBook,
    ];

    const initialValue = 0;
    const filterGrade = superArray.filter(
      (item) => item.grade && item.grade > 0,
    );

    const sumGrades = filterGrade.reduce(
      (accumulator, item) => accumulator + item.grade,
      initialValue,
    );

    const averageGrade =
      filterGrade.length > 0 ? sumGrades / filterGrade.length : 0;

    const allTags = superArray.flatMap((item) => item.tags || []);

    const initialValueTags = {};

    const tagCounts = allTags.reduce((accumulator, item) => {
      if (accumulator[item]) {
        accumulator[item] += 1;
      } else {
        accumulator[item] = 1;
      }

      return accumulator;
    }, initialValueTags);

    const topGenres = Object.entries(tagCounts)
      .map(([name, amount]) => ({ tag: name, count: amount as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      averageGrade,
      topGenres,
    };
  }
}
