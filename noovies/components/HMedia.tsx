import React from 'react';
import styled from 'styled-components/native';
import { formatImagePath } from '../utils';
import { Poster } from './Poster';
import { Votes } from './Votes';

interface HMediaProps {
  originalTitle: string;
  posterPath: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

export const HMedia: React.FC<HMediaProps> = (props) => {
  return (
    <HMovie>
      <Poster uri={formatImagePath(props.posterPath)} />
      <HColumn>
        <MovieTitle>{props.originalTitle}</MovieTitle>
        {props.releaseDate && (
          <ReleaseDate>
            {new Date(props.releaseDate).toLocaleDateString('ko', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </ReleaseDate>
        )}
        {!props.releaseDate && props.voteAverage && (
          <Votes voteAverage={props.voteAverage} />
        )}
        <Overview>
          {props.overview.length > 150
            ? props.overview.slice(0, 150).trim()
            : props.overview}
          {props.overview.length > 150 && '...'}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const MovieTitle = styled.Text`
  margin: 7px 0px 5px 0px;
`;

const Overview = styled.Text`
  width: 80%;
  margin-top: 10px;
`;

const ReleaseDate = styled.Text``;
