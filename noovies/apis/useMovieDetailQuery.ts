import { QueryFunctionContext, useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface MovieDetailQueryResData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  images: Images;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Images {
  backdrops: any[];
  logos: any[];
  posters: any[];
}

export enum OriginalLanguage {
  En = 'en',
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: OriginalLanguage;
  iso_3166_1: ISO3166_1;
  name: string;
  key: string;
  site: Site;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export enum ISO3166_1 {
  Us = 'US',
}

export enum Site {
  YouTube = 'YouTube',
}

const fetcher = async ({
  queryKey,
}: QueryFunctionContext<['MOVIE', number]>) => {
  const [_, movieId] = queryKey;
  const data = await (
    await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&&append_to_response=videos,images`
    )
  ).json();

  return data;
};

export const useMovieDetailQuery = (movieId: number, enabled: boolean) => {
  return useQuery<
    MovieDetailQueryResData,
    unknown,
    MovieDetailQueryResData,
    ['MOVIE', number]
  >(['MOVIE', movieId], fetcher, { enabled });
};
