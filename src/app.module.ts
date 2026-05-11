import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TmdbModule,
    MoviesModule,
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
