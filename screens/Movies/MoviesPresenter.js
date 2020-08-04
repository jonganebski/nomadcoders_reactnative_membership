import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import Slide from "../../components/Movies/Slide";
import Title from "../../components/Title";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlide from "../../components/HorizontalSlide";
import List from "../../components/List";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom: 50px;
`;

const Container = styled.View``;

const MoviesPresenter = ({ isLoading, nowPlaying, popular, upcoming }) => {
  return (
    <ScrollContainer isLoading={isLoading}>
      <>
        <SliderContainer>
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                backgroundImage={movie.backdrop_path}
                poster={movie.poster_path}
                votes={movie.vote_average}
                overview={movie.overview}
              ></Slide>
            ))}
          </Swiper>
        </SliderContainer>
        <Container>
          <HorizontalSlide title={"Popular Movies"}>
            {popular.map((movie) => (
              <Vertical
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                votes={movie.vote_average}
              ></Vertical>
            ))}
          </HorizontalSlide>
          <List title="Coming soon">
            {upcoming.map((movie) => (
              <Horizontal
                key={movie.id}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                poster={movie.poster_path}
                overview={movie.overview}
              ></Horizontal>
            ))}
          </List>
        </Container>
      </>
    </ScrollContainer>
  );
};

export default MoviesPresenter;
