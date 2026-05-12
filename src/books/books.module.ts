import { Module } from '@nestjs/common';
import { OpenLibraryModule } from '../integrations/open-library/open-library.module';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [OpenLibraryModule, PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
