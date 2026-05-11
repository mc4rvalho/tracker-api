/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { TmdbService } from '../../tmdb/tmdb.service';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdb: TmdbService) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  async searchFromTmdb(title: string) {
    return this.tmdb.searchMovie(title);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
