import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Loader = () => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
