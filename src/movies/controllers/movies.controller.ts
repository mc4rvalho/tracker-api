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
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MoviesService } from '../services/movies.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  CurrentUser,
  type AuthUser,
} from '../../auth/decorators/current-user.decorator';

@ApiTags('Movies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Movie in the database' })
  async create(
    @CurrentUser() user: AuthUser,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return await this.moviesService.create(createMovieDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Search all Movies in the database' })
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a Movie in the TMDB API' })
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.moviesService.searchFromTmdb(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a Movie by ID' })
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Movie in the database' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Movie in the database' })
  async remove(@Param('id') id: string) {
    return await this.moviesService.remove(id);
  }
}
