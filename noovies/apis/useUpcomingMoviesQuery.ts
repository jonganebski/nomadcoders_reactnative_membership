import { useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface UpcomingMovieResData {
  page: number;
  results: UpcomingMovieResData__result[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}

export interface UpcomingMovieResData__result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
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

export const useUpcomingMoviesQuery = () => {
  return useQuery<UpcomingMovieResData>(['MOVIES', 'UPCOMING'], fetcher);
};
