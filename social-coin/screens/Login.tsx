import React from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TOutNavParamList, OUT_NAV_SCREEN } from '../navigators/screens';

export const Login: React.FC<
  NativeStackScreenProps<TOutNavParamList, OUT_NAV_SCREEN.LOG_IN>
> = ({ navigation }) => {
  return (
    <Container__View>
      <Text>
        Don't have an account?
        <Button__TO onPress={() => navigation.navigate(OUT_NAV_SCREEN.JOIN)}>
          <ButtonText>Join</ButtonText>
        </Button__TO>
      </Text>
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
`;
const Text = styled.Text``;

const Button__TO = styled.TouchableOpacity``;
const ButtonText = styled.Text``;
