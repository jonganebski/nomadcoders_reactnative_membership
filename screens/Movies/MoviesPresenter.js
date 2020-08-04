import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import Slide from "../../components/Movies/Slide";
import Title from "../../components/Title";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 4}px;
  margin-bottom: 50px;
`;

const Container = styled.View``;

const UpcomingContainer = styled.View`
  margin-top: 20px;
`;

const MoviesPresenter = ({ isLoading, nowPlaying, popular, upcoming }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
      contentContainerStyle={{
        flex: isLoading ? 1 : "auto",
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 30 }}
              style={{ marginTop: 20, marginBottom: 40 }}
            >
              {popular.map((movie) => (
                <Vertical
                  key={movie.id}
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  votes={movie.vote_average}
                ></Vertical>
              ))}
            </ScrollView>
            <Title title={"Coming Soon"}></Title>
            <UpcomingContainer>
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
            </UpcomingContainer>
          </Container>
        </>
      )}
    </ScrollView>
  );
};

export default MoviesPresenter;
