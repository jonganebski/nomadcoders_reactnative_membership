import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { MediaType } from '../interfaces';
import { VMedia } from './VMedia';

interface HListProps {
  title: string;
  mediaType: MediaType;
  data?: {
    id: number;
    original_title?: string;
    original_name?: string;
    vote_average?: number;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
  }[];
}

export const HList: React.FC<HListProps> = (props) => {
  return (
    <ListContainer>
      <ListTitle>{props.title}</ListTitle>
      <FlatList
        data={props.data}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HSeparator}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => {
          return (
            <VMedia
              originalTitle={item.original_title ?? item.original_name}
              backdropPath={item.backdrop_path}
              voteAverage={item.vote_average}
              posterPath={item.poster_path}
              mediaType={props.mediaType}
              overview={item.overview}
              id={item.id}
            />
          );
        }}
      />
    </ListContainer>
  );
};

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  margin-bottom: 20px;
  margin-left: 30px;
  font-size: 16px;
  font-weight: 600;
`;

const HSeparator = styled.View`
  width: 20px;
`;
