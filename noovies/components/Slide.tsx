import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { formatImagePath } from '../utils';
import { Poster } from './Poster';
import { Votes } from './Votes';

interface SlideProps {
  originalTitle: string;
  backdropPath: string;
  voteAverage: number;
  posterPath: string;
  overview: string;
  id: number;
}

export const Slide: React.FC<SlideProps> = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <BgImage
        style={StyleSheet.absoluteFill}
        source={{ uri: formatImagePath(props.backdropPath) }}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={50}
        tint={isDarkMode ? 'dark' : 'light'}
      >
        <Wrapper>
          <Poster uri={formatImagePath(props.posterPath)} />
          <Column>
            <MovieTitle>{props.originalTitle}</MovieTitle>
            <Overview>{props.overview.slice(0, 100)}...</Overview>
            <Votes voteAverage={props.voteAverage} />
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

const View = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column = styled.View`
  margin-left: 15px;
  width: 40%;
`;

const BgImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const MovieTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;
