import { useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../constants';

export interface TopRatedTVShoesQueryResData {
  page: number;
  results: TopRatedTVShoesQueryResData__result[];
  total_results: number;
  total_pages: number;
}

export interface TopRatedTVShoesQueryResData__result {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: Date;
  origin_country: TopRatedTVShoesQueryResData__result__originCountry[];
  genre_ids: number[];
  original_language: TopRatedTVShoesQueryResData__result__originalLanguage;
  vote_count: number;
  name: string;
  original_name: string;
}

export enum TopRatedTVShoesQueryResData__result__originCountry {
  GB = 'GB',
  Jp = 'JP',
  Us = 'US',
}

export enum TopRatedTVShoesQueryResData__result__originalLanguage {
  En = 'en',
  Ja = 'ja',
}

const fetcher = async () => {
  const data = await (
    await fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
  ).json();
  return data;
};

export const useTopRatedTVShowsQuery = () => {
  return useQuery<TopRatedTVShoesQueryResData>(['TV', 'TOP_RATED'], fetcher);
};
