import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import Slide from "../../components/Movies/Slide";
import Title from "../../components/Title";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
  width: ${WIDTH}px;
  height: ${HEIGHT / 4}px;
  margin-bottom: 50px;
`;

const Container = styled.View``;

const MoviesPresenter = ({ isLoading, nowPlaying }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: isLoading ? "center" : "flex-start",
      }}
    >
      {isLoading ? (
        <ActivityIndicator color="white" size="small"></ActivityIndicator>
      ) : (
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
            <Title title={"Popular Movies"}></Title>
          </Container>
        </>
      )}
    </ScrollView>
  );
};

export default MoviesPresenter;
