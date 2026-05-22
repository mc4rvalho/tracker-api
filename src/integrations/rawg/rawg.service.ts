import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface RawgSearchResponse {
  results: any[];
}

@Injectable()
export class RawgService {
  private readonly logger = new Logger(RawgService.name);

  constructor(private readonly httpService: HttpService) {}

  async searchGames(title: string): Promise<any[]> {
    const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}`;

    const { data } = await firstValueFrom(
      this.httpService.get<RawgSearchResponse>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new Error('Failed to fetch game from RAWG');
        }),
      ),
    );

    return data.results;
  }
}
