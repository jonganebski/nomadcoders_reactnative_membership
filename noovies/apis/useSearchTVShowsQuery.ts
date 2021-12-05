import { QueryFunctionContext, useQuery } from 'react-query';
import { BASE_URL, API_KEY } from '../constants';

export interface SeachTVShowsQueryResData {
  page: number;
  results: SeachTVShowsQueryResData__result[];
  total_results: number;
  total_pages: number;
}

export interface SeachTVShowsQueryResData__result {
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
}: QueryFunctionContext<['SEARCH_TVSHOWS', string], any>) => {
  const [_, query] = queryKey;
  const data = await (
    await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}&include_adult=true`
    )
  ).json();
  return data;
};

export const useSeachTVShowsQuery = (query: string) => {
  return useQuery<
    SeachTVShowsQueryResData,
    unknown,
    SeachTVShowsQueryResData,
    ['SEARCH_TVSHOWS', string]
  >(['SEARCH_TVSHOWS', query], fetcher, { enabled: false });
};
