import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { HMedia } from '../components/HMedia';
import { Slide } from '../components/Slide';
import { VMedia } from '../components/VMedia';

// ScrollView has a performace issue. So we replace them to FlatList
// ScrollView renders its children at once.
// Also, read about SectionList

const API_KEY = 'f3f9b78b41bb039af5ae5b0b73675d0b';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export const Movies: React.FC<BottomTabScreenProps<any, 'Movies'>> = ({
  navigation,
}) => {
  // navigate('Stacks', { screen: 'One' })와 navigate('One')의 차이
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlayingMovies(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcomingMovies(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrendingMovies(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  return isLoading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        containerStyle={{
          width: '100%',
          height: WINDOW_HEIGHT / 4,
          marginBottom: 30,
        }}
        showsPagination={false}
        autoplayTimeout={3.5}
        showsButtons={false}
        horizontal
        autoplay
        loop
      >
        {nowPlayingMovies.map((movie) => (
          <Slide
            originalTitle={movie.original_title}
            backdropPath={movie.backdrop_path}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
            overview={movie.overview}
            id={movie.id}
            key={movie.id}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {trendingMovies.map((movie) => {
            return (
              <VMedia
                originalTitle={movie.original_title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
                key={movie.id}
              />
            );
          })}
        </TrendingScroll>
      </ListContainer>
      <ListContainer>
        <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        {upcomingMovies.map((movie) => {
          return (
            <HMedia
              originalTitle={movie.original_title}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              overview={movie.overview}
              key={movie.id}
            />
          );
        })}
      </ListContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  margin-left: 30px;
  font-size: 16px;
  font-weight: 600;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

interface Movie {
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

export interface TrendingMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: 'movie';
  original_language: OriginalLanguage;
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

export enum OriginalLanguage {
  En = 'en',
}
