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
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksService } from '../services/books.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  CurrentUser,
  type AuthUser,
} from '../../auth/decorators/current-user.decorator';

@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Book in the database' })
  async create(
    @CurrentUser() user: AuthUser,
    @Body() createBookDto: CreateBookDto,
  ) {
    return await this.booksService.create(createBookDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Search all Books in the database' })
  async findAll(@CurrentUser() user: AuthUser) {
    return await this.booksService.findAll(user.userId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a Book in the Open Library API' })
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.booksService.searchFromOpenLibrary(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a Book by ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return await this.booksService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Book in the database' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @CurrentUser() user: AuthUser,
  ) {
    return await this.booksService.update(id, updateBookDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Book in the database' })
  async remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return await this.booksService.remove(id, user.userId);
  }
}
