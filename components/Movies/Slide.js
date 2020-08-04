import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { apiImage } from "../../api";
import Poster from "../Poster";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const BG = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  position: absolute;
`;

const Content = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Data = styled.View`
  width: 50%;
  align-items: flex-start;
`;

const Title = styled.Text`
  color: white;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Votes = styled.Text`
  color: rgb(220, 220, 220);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 7px;
`;

const Overview = styled.Text`
  color: rgb(220, 220, 220);
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.View`
  background-color: #e74c3c;
  margin-top: 10px;
  padding: 7px 10px;
  border-radius: 3px;
`;

const ButtonText = styled.Text`
  color: white;
`;

const Slide = ({ id, title, backgroundImage, poster, votes, overview }) => (
  <Container>
    <BG source={{ uri: apiImage(poster) }}></BG>
    <Content>
      <Poster url={apiImage(backgroundImage)}></Poster>
      <Data>
        <Title>
          {title?.length > 40 ? `${title.substring(0, 40)}...` : title}
        </Title>
        <Votes>⭐{votes} / 10</Votes>
        <Overview>{overview?.substring(0, 110)}...</Overview>
        <TouchableOpacity>
          <Button>
            <ButtonText>View details</ButtonText>
          </Button>
        </TouchableOpacity>
      </Data>
    </Content>
  </Container>
);

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Slide;
