import { Module } from '@nestjs/common';
import { TrackerController } from './controllers/tracker.controller';
import { TrackerService } from './services/tracker.service';

@Module({
  controllers: [TrackerController],
  providers: [TrackerService],
})
export class TrackerModule {}
