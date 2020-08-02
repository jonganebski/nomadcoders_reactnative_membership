import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator } from "react-native";
import Slide from "../../components/Movies/Slider";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: black;
`;

const MoviesPresenter = ({ isLoading, nowPlaying }) => {
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator color="white" size="small"></ActivityIndicator>
      ) : (
        <>
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                id={movie.id}
                title={movie.original_language}
                backgroundImage={movie.backdrop_path}
                votes={movie.vote_average}
                overview={movie.overview}
              ></Slide>
            ))}
          </Swiper>
        </>
      )}
    </Container>
  );
};

export default MoviesPresenter;
