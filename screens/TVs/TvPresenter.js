import React from "react";
import PropTypes from "prop-types";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlide from "../../components/HorizontalSlide";
import Vertical from "../../components/Vertical";
import { Text } from "react-native";

const TvPresenter = ({ isLoading, popular, topRated }) => (
  <ScrollContainer isLoading={isLoading}>
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
  </ScrollContainer>
);

export default TvPresenter;
