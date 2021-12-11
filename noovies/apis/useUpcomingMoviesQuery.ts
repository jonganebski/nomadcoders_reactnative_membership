import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
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

const fetcher = async ({
  pageParam,
}: QueryFunctionContext<
  ['MOVIES', 'UPCOMING'],
  number
>): Promise<UpcomingMovieResData> => {
  return (
    await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }`
    )
  ).json();
};

export const useUpcomingMoviesQuery = () => {
  return useInfiniteQuery(['MOVIES', 'UPCOMING'], fetcher, {
    getNextPageParam: ({
      total_pages: totalPages,
      page: currentPage,
    }): number | null => {
      const nextPage = currentPage + 1;
      return nextPage > totalPages ? null : nextPage;
    },
  });
};
