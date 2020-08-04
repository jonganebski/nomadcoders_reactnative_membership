import React from "react";
import PropTypes from "prop-types";
import ScrollContainer from "../../components/ScrollContainer";
import { Text } from "react-native";

const TvPresenter = ({ isLoading }) => (
  <ScrollContainer isLoading={isLoading}></ScrollContainer>
);

export default TvPresenter;
