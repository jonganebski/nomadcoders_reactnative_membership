import React from 'react';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const Movies: React.FC<BottomTabScreenProps<any, 'Movies'>> = ({
  navigation,
}) => {
  // navigate('Stacks', { screen: 'One' })와 navigate('One')의 차이
  return (
    <Button
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigation.navigate('Stacks', { screen: 'One' })}
    >
      <Title>Movies</Title>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
