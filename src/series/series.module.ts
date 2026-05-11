import { Module } from '@nestjs/common';
import { SeriesController } from './controllers/series.controller';
import { SeriesService } from './services/series.service';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}
