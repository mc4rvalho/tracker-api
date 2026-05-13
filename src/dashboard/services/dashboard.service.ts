import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotals() {
    // 1. Agregações de Soma
    const game = this.prisma.game.aggregate({
      _sum: { hoursPlayed: true },
      where: { userId: '123456abc' },
    });

    const book = this.prisma.book.aggregate({
      _sum: { readPages: true },
      where: { userId: '123456abc' },
    });

    const series = this.prisma.series.aggregate({
      _sum: { watchedEpisodes: true },
      where: { userId: '123456abc' },
    });

    // 2. Agregações de Contagem por Grupo (Status)
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

    const resultStatusSeries = this.prisma.series.groupBy({
      by: ['status'],
      where: { userId: '123456abc' },
      _count: { status: true },
    });

    // 3. Execução Paralela
    const [
      resultGame,
      resultBook,
      resultSeries,
      queryStatusGame,
      queryStatusBook,
      queryStatusSeries,
    ] = await Promise.all([
      game,
      book,
      series,
      resultStatusGame,
      resultStatusBook,
      resultStatusSeries,
    ]);

    // 4. Consolidação dos Status
    const statusDistribution = {
      WISHLIST: 0,
      IN_PROGRESS: 0,
      FINISHED: 0,
    };

    const superArray = [
      ...queryStatusGame,
      ...queryStatusBook,
      ...queryStatusSeries,
    ];

    superArray.forEach((item) => {
      statusDistribution[item.status] += item._count.status;
    });

    // 5. Retorno Final Limpo
    return {
      totalHoursPlayed: resultGame._sum.hoursPlayed || 0,
      totalReadPages: resultBook._sum.readPages || 0,
      totalWatchedEpisodes: resultSeries._sum.watchedEpisodes || 0,
      statusDistribution,
    };
  }
}
