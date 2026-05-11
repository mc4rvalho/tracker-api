import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSeriesDto } from '../dto/create-series.dto';
import { UpdateSeriesDto } from '../dto/update-series.dto';
import { SeriesService } from '../services/series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  async create(@Body() createSeriesDto: CreateSeriesDto) {
    return await this.seriesService.create(createSeriesDto);
  }

  @Get()
  async findAll() {
    return await this.seriesService.findAll();
  }

  @Get('search')
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.seriesService.searchFromTmdb(title);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.seriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return await this.seriesService.update(id, updateSeriesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.seriesService.remove(id);
  }
}
