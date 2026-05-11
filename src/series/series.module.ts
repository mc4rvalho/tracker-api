import { Module } from '@nestjs/common';
import { TmdbModule } from '../integrations/tmdb/tmdb.module';
import { SeriesController } from './controllers/series.controller';
import { SeriesService } from './services/series.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TmdbModule, PrismaModule],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}
