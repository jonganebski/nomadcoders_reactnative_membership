import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Linking } from 'react-native';
import styled from 'styled-components/native';
import { Poster } from '../components/Poster';
import { MediaType } from '../interfaces';
import { StackParamList } from '../navigation/Stacks';
import { formatImagePath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { RUSSIAN_PALETTE } from '../colors';
import { useMovieDetailQuery } from '../apis/useMovieDetailQuery';
import { useTVShowDetailQuery } from '../apis/useTVShowDetailQuery';
import { Loader } from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as ExpoWebBrowser from 'expo-web-browser'; // To open the browser inside of the app.

// Need to install expo-linear-gradient to style gradient like css. Don't forget to npx pod-install ios

export interface DetailScreenParamList {
  id: number;
  mediaType: MediaType;
  originalTitle: string;
  backdropPath: string | null;
  posterPath: string | null;
  overview: string;
}

export const Detail: React.FC<
  NativeStackScreenProps<StackParamList, 'Detail'>
> = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle:
        props.route.params.mediaType === 'movie' ? 'Movie' : 'TV Show',
    });
  }, []);
  const { isLoading: isMovieDetailQueryLoading, data: movieDetailData } =
    useMovieDetailQuery(
      props.route.params.id,
      props.route.params.mediaType === 'movie'
    );
  const { isLoading: isTVShowDetailQueryLoading, data: tvShowDetailData } =
    useTVShowDetailQuery(
      props.route.params.id,
      props.route.params.mediaType === 'tvShow'
    );

  const isLoading = isMovieDetailQueryLoading || isTVShowDetailQueryLoading;

  const openYouTubeLink = async (videoKey: string) => {
    const URL = `https://m.youtube.com/watch?v=${videoKey}`;
    // 그냥 Linking과 ExpoWebBrowser 모두 보여주기 위해 이렇게 함.
    const canOpenURL = await Linking.canOpenURL(URL);
    if (canOpenURL) {
      await Linking.openURL(URL); // 웹브라우저를 열거나 유튜브 앱을 염
    } else {
      await ExpoWebBrowser.openBrowserAsync(URL); // 현재 앱 내에서 염.
    }
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: formatImagePath(props.route.params.backdropPath) }}
        />
        <LinearGradient
          colors={['transparent', RUSSIAN_PALETTE.biscay]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster uri={formatImagePath(props.route.params.posterPath)} />
          <Title>{props.route.params.originalTitle}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{props.route.params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {movieDetailData?.videos.results.map((video) => {
          return (
            <VideoBtn onPress={() => openYouTubeLink(video.key)} key={video.id}>
              <YouTubeIcon name="logo-youtube" size={20} />
              <BtnText>{video.name}</BtnText>
            </VideoBtn>
          );
        })}
      </Data>
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${(props) => props.theme.WINDOW_HEIGHT / 4 + 'px'};
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  width: 80%;
  flex-direction: row;
`;

const Title = styled.Text`
  margin-left: 15px;
  font-size: 32px;
  font-weight: 500;
  color: white;
  align-self: flex-end;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  margin: 20px 0px;
  color: ${(props) => props.theme.textColor};
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const YouTubeIcon = styled(Ionicons)`
  margin-right: 10px;
  color: ${(props) => props.theme.textColor};
`;

const BtnText = styled.Text``;
