import { useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface AiringTodayTVShowsQueryResData {
  page: number;
  results: AiringTodayTVShowsQueryResData__result[];
  total_results: number;
  total_pages: number;
}

export interface AiringTodayTVShowsQueryResData__result {
  poster_path: null | string;
  popularity: number;
  id: number;
  backdrop_path: null | string;
  vote_average: number;
  overview: string;
  first_air_date: Date;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

const fetcher = async () => {
  const data = await (
    await fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
    )
  ).json();
  return data;
};

export const useAiringTodayTVShowsQuery = () => {
  return useQuery<AiringTodayTVShowsQueryResData>(
    ['TV', 'AIRING_TODAY'],
    fetcher
  );
};
