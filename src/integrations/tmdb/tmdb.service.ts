import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

export interface TmdbSearchResponse {
  results: any[];
}

export interface TmdbSeriesDetailsResponse {
  number_of_episodes: number;
  number_of_seasons: number;
}

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);

  constructor(private readonly httpService: HttpService) {}

  async searchMovie(title: string): Promise<any[]> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<TmdbSearchResponse>(url, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            accept: 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw new Error('Failed to fetch movies from TMDB');
          }),
        ),
    );

    return data.results;
  }

  async searchSeries(title: string): Promise<any[]> {
    const url = `https://api.themoviedb.org/3/search/tv?query=${title}`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<TmdbSearchResponse>(url, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            accept: 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw new Error('Failed to fetch series from TMDB');
          }),
        ),
    );

    return data.results;
  }

  async getSeriesDetails(tmdbId: number): Promise<TmdbSeriesDetailsResponse> {
    const url = `https://api.themoviedb.org/3/tv/${tmdbId}`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<TmdbSeriesDetailsResponse>(url, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            accept: 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw new Error('Failed to fetch series details from TMDB');
          }),
        ),
    );

    return data;
  }
}
