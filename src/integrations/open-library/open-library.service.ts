import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface OpenLibrarySearchResponse {
  docs: any[];
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
}
