import { Module } from '@nestjs/common';
import { TmdbModule } from '../integrations/tmdb/tmdb.module';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TmdbModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
