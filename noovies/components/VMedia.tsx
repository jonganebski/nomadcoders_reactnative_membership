import React from 'react';
import styled from 'styled-components/native';
import { formatImagePath } from '../utils';
import { Poster } from './Poster';
import { Votes } from './Votes';

interface VMediaProps {
  originalTitle: string;
  posterPath: string;
  voteAverage: number;
}

export const VMedia: React.FC<VMediaProps> = (props) => {
  const title = props.originalTitle.slice(0, 13);

  return (
    <Movie>
      <Poster uri={formatImagePath(props.posterPath)} />
      <MovieTitle>
        {title}
        {props.originalTitle.length > 13 && '...'}
      </MovieTitle>
      <Votes voteAverage={props.voteAverage} />
    </Movie>
  );
};

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const MovieTitle = styled.Text`
  margin: 7px 0px 5px 0px;
`;
