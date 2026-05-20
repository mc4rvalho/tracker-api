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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Series in the database' })
  async create(@Body() createSeriesDto: CreateSeriesDto) {
    return await this.seriesService.create(createSeriesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all Series in the database' })
  async findAll() {
    return await this.seriesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a Series in the TMDB' })
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.seriesService.searchFromTmdb(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a Series for ID' })
  async findOne(@Param('id') id: string) {
    return await this.seriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Series in the database' })
  async update(
    @Param('id') id: string,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return await this.seriesService.update(id, updateSeriesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Series in the database' })
  async remove(@Param('id') id: string) {
    return await this.seriesService.remove(id);
  }
}
