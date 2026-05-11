import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
