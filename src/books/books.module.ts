import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './entities/books.service';
import { OpenLibraryModule } from '../integrations/open-library/open-library.module';

@Module({
  imports: [OpenLibraryModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
