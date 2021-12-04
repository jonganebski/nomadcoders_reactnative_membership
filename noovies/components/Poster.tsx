import React from 'react';
import styled from 'styled-components/native';

interface PosterProps {
  uri: string;
}

export const Poster: React.FC<PosterProps> = ({ uri }) => {
  return <StyledImage source={{ uri }} />;
};

const StyledImage = styled.Image`
  width: 100px;
  height: 160px;
`;
