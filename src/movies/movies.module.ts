import { Module } from '@nestjs/common';
import { TmdbModule } from '../integrations/tmdb/tmdb.module';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';

@Module({
  imports: [TmdbModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
