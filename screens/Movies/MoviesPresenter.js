import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions, ActivityIndicator } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: black;
`;

const Header = styled.View`
  width: 100%;
  height: ${screenHeight / 3}px;
`;

const Section = styled.View`
  background-color: red;
  height: 100%;
`;

const Text = styled.Text``;

const MoviesPresenter = ({ isLoading, nowPlaying }) => {
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator color="white" size="small"></ActivityIndicator>
      ) : (
        <Header>
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map((movie) => (
              <Section key={movie.id}>
                <Text>{movie.original_title}</Text>
              </Section>
            ))}
          </Swiper>
        </Header>
      )}
    </Container>
  );
};

export default MoviesPresenter;
