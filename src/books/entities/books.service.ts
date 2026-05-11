/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { OpenLibraryService } from '../../integrations/open-library/open-library.service';

@Injectable()
export class BooksService {
  constructor(private readonly open: OpenLibraryService) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async searchFromOpenLibrary(title: string) {
    return this.open.searchBook(title);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
