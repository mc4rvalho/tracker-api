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
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BooksService } from '../services/books.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Book in the database' })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all Books in the database' })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search a Book in the Open Library API' })
  async findSearch(@Query('title') title: string): Promise<any[]> {
    return await this.booksService.searchFromOpenLibrary(title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a Book by ID' })
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Book in the database' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Book in the database' })
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
