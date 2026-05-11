import { Module } from '@nestjs/common';
import { RawgModule } from '../integrations/rawg/rawg.module';
import { GamesController } from './controllers/games.controller';
import { GamesService } from './services/games.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RawgModule, PrismaModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
