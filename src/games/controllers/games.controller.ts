import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
import { GamesService } from '../services/games.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  CurrentUser,
  type AuthUser,
} from '../../auth/decorators/current-user.decorator';

@ApiTags('Games')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Game in the database' })
  async create(
    @CurrentUser() user: AuthUser,
    @Body() createGameDto: CreateGameDto,
  ) {
    return await this.gamesService.create(createGameDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Search all Games in the database' })
  async findAll(@CurrentUser() user: AuthUser) {
    return await this.gamesService.findAll(user.userId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a Game in the RAWG API' })
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.gamesService.searchFromRawg(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a Game by ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return await this.gamesService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Game in the database' })
  async update(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
    @CurrentUser() user: AuthUser,
  ) {
    return await this.gamesService.update(id, updateGameDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Game in the database' })
  async remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return await this.gamesService.remove(id, user.userId);
  }
}
