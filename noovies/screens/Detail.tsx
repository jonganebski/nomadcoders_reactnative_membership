import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as ExpoWebBrowser from 'expo-web-browser'; // To open the browser inside of the app.
import React, { useEffect } from 'react';
import { Linking, Platform, Share, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useMovieDetailQuery } from '../apis/useMovieDetailQuery';
import { useTVShowDetailQuery } from '../apis/useTVShowDetailQuery';
import { RUSSIAN_PALETTE } from '../colors';
import { Loader } from '../components/Loader';
import { Poster } from '../components/Poster';
import { MediaType } from '../interfaces';
import { StackParamList } from '../navigation/Stacks';
import { formatImagePath } from '../utils';

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

  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';

    const url =
      props.route.params.mediaType === 'movie'
        ? `https://www.imdb.com/title/${movieDetailData?.imdb_id}/`
        : tvShowDetailData?.homepage ?? '';

    await Share.share({
      ...(isAndroid
        ? { message: `${props.route.params.overview}\n Check it out: ${url}` }
        : { url }),
      title: props.route.params.originalTitle,
    });
  };

  const ShareBtn = () => {
    return (
      <TouchableOpacity onPress={shareMedia}>
        <StyledIcon name="share" size={20} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle:
        props.route.params.mediaType === 'movie' ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    if (
      (props.route.params.mediaType === 'movie' && movieDetailData) ||
      (props.route.params.mediaType === 'tvShow' && tvShowDetailData)
    ) {
      props.navigation.setOptions({
        headerRight: ShareBtn,
      });
    }
  }, [props.route.params.mediaType, movieDetailData, tvShowDetailData]); // 이렇게 하지 않고 didMount로 해버리면 shareMedia함수가 선언될 당시에는 data가 없기 때문에 에러가 발생한다. Header에 뭔가를 넣을 때에는 주의해야 한다. 왜냐하면 헤더에 들어가는 컴포넌트는 리랜더 되지 않기 때문에 언제 그 컴포넌트를 넣는지가 중요하다.

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
              <StyledIcon name="logo-youtube" size={20} />
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

const StyledIcon = styled(Ionicons)`
  margin-right: 10px;
  color: ${(props) => props.theme.textColor};
`;

const BtnText = styled.Text``;
