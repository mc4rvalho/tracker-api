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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Game in the database' })
  async create(@Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all Games in the database' })
  async findAll() {
    return await this.gamesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a Game in the RAWG API' })
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.gamesService.searchFromRawg(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a Game by ID' })
  async findOne(@Param('id') id: string) {
    return await this.gamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Game in the database' })
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return await this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Game in the database' })
  async remove(@Param('id') id: string) {
    return await this.gamesService.remove(id);
  }
}
