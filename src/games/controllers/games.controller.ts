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
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto);
  }

  @Get()
  async findAll() {
    return await this.gamesService.findAll();
  }

  @Get('search')
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.gamesService.searchFromRawg(title);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.gamesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return await this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.gamesService.remove(id);
  }
}
