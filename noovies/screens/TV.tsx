import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQueryClient } from 'react-query';
import { useAiringTodayTVShowsQuery } from '../apis/useAiringTodayTVShowsQuery';
import { useTopRatedTVShowsQuery } from '../apis/useTopRatedTVShowsQuery';
import { useTrendingTVShowsQuery } from '../apis/useTrendingTVShowsQuery';
import { HList } from '../components/HList';
import { Loader } from '../components/Loader';

// Vertical ScrollList > Vertical FlatList (X)
// Vertical ScrollList > Horizontal FlatList (O)

export const TV = () => {
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: trendingTVShowsData, isLoading: isTrendingTVShowsLoading } =
    useTrendingTVShowsQuery();
  const {
    data: airingTodayTVShowsData,
    isLoading: isAiringTodayTVShowsLoading,
  } = useAiringTodayTVShowsQuery();
  const { data: topRatedTVShowsData, isLoading: isTopRatedTVShowsLoading } =
    useTopRatedTVShowsQuery();

  const isLoading =
    isTrendingTVShowsLoading ||
    isAiringTodayTVShowsLoading ||
    isTopRatedTVShowsLoading;

  // This causes ugly loading because of many rerenders
  // const isRefreshing =
  //   isTrendingTVShowsRefetching ||
  //   isAiringTodayTVShowsRefetching ||
  //   isTopRatedTVShowsRefetching;

  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.refetchQueries(['TV']);
    setIsRefreshing(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <HList
        title="Trending"
        mediaType="tvShow"
        data={trendingTVShowsData?.results}
      />
      <HList
        title="Airing Today"
        mediaType="tvShow"
        data={airingTodayTVShowsData?.results}
      />
      <HList
        title="Top Rated"
        mediaType="tvShow"
        data={topRatedTVShowsData?.results}
      />
    </ScrollView>
  );
};
