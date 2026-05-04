import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TrackerModule } from './tracker/tracker.module';

@Module({
  imports: [PrismaModule, TrackerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
