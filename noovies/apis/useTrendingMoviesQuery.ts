import { useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface TrendingMovieResData {
  page: number;
  results: TrendingMovieResData__result[];
  total_pages: number;
  total_results: number;
}

export enum TrendingMovie__result__originalLanguage {
  En = 'en',
}

export interface TrendingMovieResData__result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: 'movie';
  original_language: TrendingMovie__result__originalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const fetcher = async () => {
  return (
    await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    )
  ).json();
};

export const useTrendingMoviesQuery = () => {
  return useQuery<TrendingMovieResData>(['MOVIES', 'TRENDING'], fetcher);
};
