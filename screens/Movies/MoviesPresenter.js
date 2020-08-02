import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../../components/Movies/Slider";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: black;
`;

const SliderContainer = styled.View`
  width: ${WIDTH}px;
  height: ${HEIGHT / 4}px;
`;

const MoviesPresenter = ({ isLoading, nowPlaying }) => {
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator color="white" size="small"></ActivityIndicator>
      ) : (
        <SliderContainer>
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                backgroundImage={movie.backdrop_path}
                votes={movie.vote_average}
                overview={movie.overview}
              ></Slide>
            ))}
          </Swiper>
        </SliderContainer>
      )}
    </Container>
  );
};

export default MoviesPresenter;
