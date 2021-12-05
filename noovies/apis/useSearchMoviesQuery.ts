import { QueryFunctionContext, useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface SeachMoviesQueryResData {
  page: number;
  results: SeachMoviesQueryResData__result[];
  total_results: number;
  total_pages: number;
}

export interface SeachMoviesQueryResData__result {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
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

const fetcher = async ({
  queryKey,
}: QueryFunctionContext<['SEARCH_MOVIES', string], any>) => {
  const [_, query] = queryKey;
  const data = await (
    await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}&include_adult=true`
    )
  ).json();
  return data;
};

export const useSearchMoviesQuery = (query: string) => {
  return useQuery<
    SeachMoviesQueryResData,
    unknown,
    SeachMoviesQueryResData,
    ['SEARCH_MOVIES', string]
  >(['SEARCH_MOVIES', query], fetcher, {
    enabled: false,
  });
};
