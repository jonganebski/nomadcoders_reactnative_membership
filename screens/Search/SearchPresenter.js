import React from "react";
import styled from "styled-components/native";
import Input from "../../components/Search/Input";
import HorizontalSlide from "../../components/HorizontalSlide";
import Vertical from "../../components/Vertical";

const Container = styled.ScrollView`
  background-color: black;
`;

const SerachPresenter = ({ movies, shows, keyword, onChange, onSubmit }) => (
  <Container>
    <Input
      placeholder="Write a keyword"
      value={keyword}
      onChange={onChange}
      onSubmit={onSubmit}
    ></Input>
    {movies.length !== 0 && (
      <HorizontalSlide title="Movie Results">
        {movies.map((movie) => (
          <Vertical
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            votes={movie.vote_average}
          ></Vertical>
        ))}
      </HorizontalSlide>
    )}
    {shows.length !== 0 && (
      <HorizontalSlide title="TV Shows Results">
        {shows.map((show) => (
          <Vertical
            key={show.id}
            id={show.id}
            title={show.name}
            poster={show.poster_path}
            votes={show.vote_average}
          ></Vertical>
        ))}
      </HorizontalSlide>
    )}
  </Container>
);

export default SerachPresenter;
