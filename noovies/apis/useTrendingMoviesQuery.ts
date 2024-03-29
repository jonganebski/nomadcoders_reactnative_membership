import { useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface TrendingMoviesResData {
  page: number;
  results: TrendingMoviesResData__result[];
  total_pages: number;
  total_results: number;
}

export enum TrendingMoviesResData__result__originalLanguage {
  En = 'en',
}

export interface TrendingMoviesResData__result {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: TrendingMoviesResData__result__originalLanguage;
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
  return (
    await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  ).json();
};

export const useTrendingMoviesQuery = () => {
  return useQuery<TrendingMoviesResData>(['MOVIES', 'TRENDING'], fetcher);
};
