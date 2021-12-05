import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useSearchMoviesQuery } from '../apis/useSearchMoviesQuery';
import { useSeachTVShowsQuery } from '../apis/useSearchTVShowsQuery';
import { HList } from '../components/HList';
import { Loader } from '../components/Loader';

// CMD SHIFT K to turn on/off ios keyboard

export const Search = () => {
  const [query, setQuery] = useState('');

  const {
    data: searchMoviesData,
    refetch: refetchSearchMoviesQuery,
    isLoading: isSeachMoviesQueryLoading,
  } = useSearchMoviesQuery(query);
  const {
    data: searchTVShowsData,
    refetch: refetchSearchTVShowsQuery,
    isLoading: isSearchTVShowsQueryLoading,
  } = useSeachTVShowsQuery(query);

  const isLoading = isSeachMoviesQueryLoading || isSearchTVShowsQueryLoading;

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (!query) return;
    refetchSearchMoviesQuery();
    refetchSearchTVShowsQuery();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for a Movie or TV Show"
        placeholderTextColor="gray"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {isLoading ? <Loader /> : null}
      {searchMoviesData && (
        <HList
          title="Found Movies"
          mediaType="movie"
          data={searchMoviesData.results}
        />
      )}
      {searchTVShowsData && (
        <HList
          title="Found TV Shows"
          mediaType="tvShow"
          data={searchTVShowsData.results}
        />
      )}
    </Container>
  );
};

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  padding: 10px 15px;
  background-color: white;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto 40px auto;
`;
