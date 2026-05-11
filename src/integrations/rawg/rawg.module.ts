import { Module } from '@nestjs/common';
import { RawgService } from './rawg.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RawgService],
  exports: [RawgService],
})
export class RawgModule {}
