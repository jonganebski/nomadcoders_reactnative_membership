import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListRenderItem,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import { useNowPlayingMoviesQuery } from '../apis/useNowPlayingMoviesQuery';
import {
  TrendingMoviesResData__result,
  useTrendingMoviesQuery,
} from '../apis/useTrendingMoviesQuery';
import {
  UpcomingMovieResData__result,
  useUpcomingMoviesQuery,
} from '../apis/useUpcomingMoviesQuery';
import { HList } from '../components/HList';
import { HMedia } from '../components/HMedia';
import { Loader } from '../components/Loader';
import { Slide } from '../components/Slide';
import { VMedia } from '../components/VMedia';

// ScrollView has a performace issue. So we replace them to FlatList
// ScrollView renders its children at once.
// Also, read about SectionList

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export const Movies: React.FC<BottomTabScreenProps<any, 'Movies'>> = ({
  navigation,
}) => {
  // navigate('Stacks', { screen: 'One' })와 navigate('One')의 차이
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    isLoading: isNowPlayingMoviesQueryLoading,
    data: nowPlayingMoviesData,
  } = useNowPlayingMoviesQuery();
  const { isLoading: isTrendingMoviesQueryLoading, data: trendingMoviesData } =
    useTrendingMoviesQuery();
  const { isLoading: isUpcomingMoviesQueryLoading, data: upcomingMoviesData } =
    useUpcomingMoviesQuery();

  const isLoading =
    isNowPlayingMoviesQueryLoading ||
    isTrendingMoviesQueryLoading ||
    isUpcomingMoviesQueryLoading;

  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.refetchQueries(['MOVIES']);
    setIsRefreshing(false);
  };

  const renderHMedia: ListRenderItem<UpcomingMovieResData__result> = ({
    item,
  }) => {
    return (
      <HMedia
        originalTitle={item.original_title}
        backdropPath={item.backdrop_path}
        releaseDate={item.release_date}
        voteAverage={item.vote_average}
        posterPath={item.poster_path}
        overview={item.overview}
        mediaType="movie"
        id={item.id}
        key={item.id}
      />
    );
  };

  const keyExtractor = (item: { id: number }) => item.id + '';

  return isLoading ? (
    <Loader />
  ) : upcomingMoviesData ? (
    <Container
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      data={upcomingMoviesData.results}
      keyExtractor={keyExtractor}
      renderItem={renderHMedia}
      ItemSeparatorComponent={VSeparator}
      ListHeaderComponent={() => {
        return (
          <>
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
              {nowPlayingMoviesData?.results.map((movie) => (
                <Slide
                  originalTitle={movie.original_title}
                  backdropPath={movie.backdrop_path}
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path}
                  overview={movie.overview}
                  mediaType="movie"
                  id={movie.id}
                  key={movie.id}
                />
              ))}
            </Swiper>
            <HList
              title="Trending Movies"
              mediaType="movie"
              data={trendingMoviesData?.results}
            />
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          </>
        );
      }}
    ></Container>
  ) : null;
};

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
` as unknown as typeof FlatList;

const ListTitle = styled.Text`
  margin-left: 30px;
  font-size: 16px;
  font-weight: 600;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const VSeparator = styled.View`
  height: 20px;
`;
