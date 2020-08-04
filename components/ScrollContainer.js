import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";

const ScrollContainer = ({ isLoading, children }) => (
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
      children
    )}
  </ScrollView>
);

ScrollContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ScrollContainer;
