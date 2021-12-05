import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import { MediaType } from '../interfaces';
import { RootParamList } from '../navigation/Root';
import { formatImagePath } from '../utils';
import { Poster } from './Poster';
import { Votes } from './Votes';

interface VMediaProps {
  id: number;
  mediaType: MediaType;
  originalTitle?: string;
  posterPath: string | null;
  voteAverage?: number;
  backdropPath: string | null;
  overview: string;
}

export const VMedia: React.FC<VMediaProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const goToDetailScreen = () => {
    navigation.navigate('Stacks', {
      screen: 'Detail',
      params: {
        id: props.id,
        mediaType: props.mediaType,
        originalTitle: props.originalTitle ?? '',
        posterPath: props.posterPath,
        backdropPath: props.backdropPath,
        overview: props.overview,
      },
    });
  };

  const title = props.originalTitle?.slice(0, 13) ?? '';

  return (
    <Movie onPress={goToDetailScreen}>
      <Poster uri={formatImagePath(props.posterPath)} />
      <MovieTitle>
        {title}
        {props.originalTitle && props.originalTitle.length > 13 && '...'}
      </MovieTitle>
      <Votes voteAverage={props.voteAverage} />
    </Movie>
  );
};

const Movie = styled.TouchableOpacity`
  align-items: center;
`;

const MovieTitle = styled.Text`
  margin: 7px 0px 5px 0px;
`;
