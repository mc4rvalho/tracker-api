import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { GamesModule } from './games/games.module';
import { OpenLibraryModule } from './integrations/open-library/open-library.module';
import { RawgModule } from './integrations/rawg/rawg.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { SeriesModule } from './series/series.module';
import { TmdbModule } from './integrations/tmdb/tmdb.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TmdbModule,
    MoviesModule,
    SeriesModule,
    RawgModule,
    GamesModule,
    BooksModule,
    OpenLibraryModule,
    DashboardModule,
    UsersModule,
  ],
})
export class AppModule {}
