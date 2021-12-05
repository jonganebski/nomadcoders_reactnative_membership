import { QueryFunctionContext, useQuery } from 'react-query';
import { BASE_URL, API_KEY } from '../constants';

export interface TVShowDetailQueryResData {
  backdrop_path: string;
  created_by: TVShowDetailQueryResData__createdBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: TVShowDetailQueryResData__genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: TVShowDetailQueryResData__lastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: TVShowDetailQueryResData__network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TVShowDetailQueryResData__network[];
  production_countries: TVShowDetailQueryResData__productionCountry[];
  seasons: TVShowDetailQueryResData__season[];
  spoken_languages: TVShowDetailQueryResData__spokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowDetailQueryResData__createdBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface TVShowDetailQueryResData__genre {
  id: number;
  name: string;
}

export interface TVShowDetailQueryResData__lastEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowDetailQueryResData__network {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

export interface TVShowDetailQueryResData__productionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TVShowDetailQueryResData__season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TVShowDetailQueryResData__spokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const fetcher = async ({
  queryKey,
}: QueryFunctionContext<['TVSHOW', number]>) => {
  const [_, tvId] = queryKey;
  const data = await (
    await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`)
  ).json();
  console.log(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`);
  return data;
};

export const useTVShowDetailQuery = (tvId: number, enabled: boolean) => {
  return useQuery<
    TVShowDetailQueryResData,
    unknown,
    TVShowDetailQueryResData,
    ['TVSHOW', number]
  >(['TVSHOW', tvId], fetcher, { enabled });
};
