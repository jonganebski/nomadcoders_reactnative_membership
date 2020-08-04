import React from "react";
import styled from "styled-components/native";
import Input from "../../components/Search/Input";
import HorizontalSlide from "../../components/HorizontalSlide";
import Horizontal from "../../components/Horizontal";

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
    <HorizontalSlide title="Movie Results">
      {movies.map((movie) => (
        <Horizontal></Horizontal>
      ))}
    </HorizontalSlide>
    <HorizontalSlide title="TV Shows Results">
      {shows.map((show) => (
        <Horizontal></Horizontal>
      ))}
    </HorizontalSlide>
  </Container>
);

export default SerachPresenter;
