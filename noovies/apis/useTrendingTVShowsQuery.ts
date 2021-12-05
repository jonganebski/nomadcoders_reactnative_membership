import { useQuery } from 'react-query';
import { BASE_URL, API_KEY } from '../constants';

export interface TrendingTVShowsResData {
  page: number;
  results: TrendingTVShowsResData__result[];
  total_pages: number;
  total_results: number;
}

export enum TrendingTVShowsResData__result__originalLanguage {
  En = 'en',
}

export interface TrendingTVShowsResData__result {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: TrendingTVShowsResData__result__originalLanguage;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  first_air_date?: Date;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}

const fetcher = async () => {
  const data = await (
    await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`)
  ).json();
  return data;
};

export const useTrendingTVShowsQuery = () => {
  return useQuery<TrendingTVShowsResData>(['TV', 'TRENDING'], fetcher);
};
