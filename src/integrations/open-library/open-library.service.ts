import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface OpenLibrarySearchResponse {
  docs: any[];
}

export interface BookDetailsResponse {
  number_of_pages?: number;
}

@Injectable()
export class OpenLibraryService {
  private readonly logger = new Logger(OpenLibraryService.name);

  constructor(private readonly httpService: HttpService) {}

  async searchBook(title: string): Promise<any[]> {
    const url = `https://openlibrary.org/search.json?title=${title}`;

    const { data } = await firstValueFrom(
      this.httpService.get<OpenLibrarySearchResponse>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new Error('Failed to fetch book from Open Library');
        }),
      ),
    );

    return data.docs;
  }

  async getBookDetails(openLibraryId: string): Promise<BookDetailsResponse> {
    const url = `https://openlibrary.org${openLibraryId}.json`;

    const { data } = await firstValueFrom(
      this.httpService.get<BookDetailsResponse>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new Error('Failed to fetch book details from TMDB');
        }),
      ),
    );

    return data;
  }
}
