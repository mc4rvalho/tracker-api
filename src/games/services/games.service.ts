/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { RawgService } from '../../integrations/rawg/rawg.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly rawg: RawgService) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  async searchFromRawg(title: string) {
    return this.rawg.searchGames(title);
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
