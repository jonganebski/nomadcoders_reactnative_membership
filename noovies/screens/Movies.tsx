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
  TrendingMovieResData__result,
  useTrendingMoviesQuery,
} from '../apis/useTrendingMoviesQuery';
import {
  UpcomingMovieResData__result,
  useUpcomingMoviesQuery,
} from '../apis/useUpcomingMoviesQuery';
import { HMedia } from '../components/HMedia';
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
        releaseDate={item.release_date}
        voteAverage={item.vote_average}
        posterPath={item.poster_path}
        overview={item.overview}
        key={item.id}
      />
    );
  };

  const renderVMedia: ListRenderItem<TrendingMovieResData__result> = ({
    item,
  }) => {
    return (
      <VMedia
        originalTitle={item.original_title}
        posterPath={item.poster_path}
        voteAverage={item.vote_average}
      />
    );
  };

  const keyExtractor = (item: { id: number }) => item.id + '';

  return isLoading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
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
                  id={movie.id}
                  key={movie.id}
                />
              ))}
            </Swiper>
            <ListContainer>
              <ListTitle>Trending Movies</ListTitle>
              <TrendingScroll
                contentContainerStyle={{ paddingHorizontal: 30 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={trendingMoviesData?.results}
                keyExtractor={keyExtractor}
                renderItem={renderVMedia}
                ItemSeparatorComponent={HSeparator}
              />
            </ListContainer>
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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const HSeparator = styled.View`
  width: 20px;
`;

const VSeparator = styled.View`
  height: 20px;
`;
