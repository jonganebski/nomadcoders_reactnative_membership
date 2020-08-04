import React from "react";
import PropTypes from "prop-types";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlide from "../../components/HorizontalSlide";
import Vertical from "../../components/Vertical";
import styled from "styled-components/native";
import List from "../../components/List";
import Horizontal from "../../components/Horizontal";

const Container = styled.View`
  margin-top: 30px;
`;

const TvPresenter = ({ isLoading, popular, topRated, today }) => (
  <ScrollContainer isLoading={isLoading}>
    <Container>
      <HorizontalSlide title="Popular">
        {popular.map((show) => (
          <Vertical
            key={show.id}
            id={show.id}
            poster={show.poster_path}
            title={show.name}
            votes={show.vote_average}
          ></Vertical>
        ))}
      </HorizontalSlide>
      <HorizontalSlide title="Top Rated">
        {topRated.map((show) => (
          <Vertical
            key={show.id}
            id={show.id}
            poster={show.poster_path}
            title={show.name}
            votes={show.vote_average}
          ></Vertical>
        ))}
      </HorizontalSlide>
      <List title="Airing Today">
        {today.map((show) => (
          <Horizontal
            key={show.id}
            id={show.id}
            title={show.name}
            poster={show.poster_path}
            overview={show.overview}
          ></Horizontal>
        ))}
      </List>
    </Container>
  </ScrollContainer>
);

export default TvPresenter;
