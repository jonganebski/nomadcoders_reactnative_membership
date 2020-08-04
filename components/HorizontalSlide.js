import React from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import Title from "./Title";

const HorizontalSlide = ({ title, children }) => (
  <>
    <Title title={title}></Title>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 30 }}
      style={{ marginTop: 20, marginBottom: 40 }}
    >
      {children}
    </ScrollView>
  </>
);

HorizontalSlide.ptopTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HorizontalSlide;
