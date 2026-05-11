/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from '../dto/create-series.dto';
import { UpdateSeriesDto } from '../dto/update-series.dto';
import { TmdbService } from '../../tmdb/tmdb.service';

@Injectable()
export class SeriesService {
  constructor(private readonly tmdb: TmdbService) {}

  create(createSeriesDto: CreateSeriesDto) {
    return 'This action adds a new series';
  }

  findAll() {
    return `This action returns all series`;
  }

  findOne(id: number) {
    return `This action returns a #${id} series`;
  }

  async searchFromTmdb(title: string) {
    return this.tmdb.searchSeries(title);
  }

  update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return `This action updates a #${id} series`;
  }

  remove(id: number) {
    return `This action removes a #${id} series`;
  }
}
