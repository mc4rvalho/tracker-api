/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { OpenLibraryService } from '../../integrations/open-library/open-library.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Book, Prisma } from '../../../generated/prisma/client';

@Injectable()
export class BooksService {
  constructor(
    private readonly open: OpenLibraryService,
    private prisma: PrismaService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.prisma.book.create({
      data: { ...createBookDto, userId: '123456abc' },
    });
  }

  async findAll(filters?: {
    title?: string;
    category?: string;
    grade?: number;
    coverPath?: string;
    review?: string;
    author?: string;
    tags?: string[];
  }) {
    return this.prisma.book.findMany({
      where: {
        userId: '123456abc',
        title: filters?.title || undefined,
        category: filters?.category || undefined,
        grade: filters?.grade || undefined,
        coverPath: filters?.coverPath || undefined,
        review: filters?.review || undefined,
        author: filters?.author || undefined,
        tags: filters?.tags ? { hasEvery: filters.tags } : undefined,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async searchFromOpenLibrary(title: string) {
    return this.open.searchBook(title);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const dataToUpdate: Prisma.BookUpdateInput = {
      ...updateBookDto,
    };

    if (updateBookDto.status === 'FINISHED') {
      dataToUpdate.finishedAt = new Date();
    }

    return this.prisma.book.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.book.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(
        'Opa, esse livro não existe ou já foi apagado!',
      );
    }

    return { message: 'Livro excluído com sucesso!' };
  }
}
