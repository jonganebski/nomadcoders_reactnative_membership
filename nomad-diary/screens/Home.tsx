import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

export const Home: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  return (
    <Container__View>
      <Title__Text>My Journal</Title__Text>
      <Button__TO onPress={() => navigation.navigate('Write')}>
        <Ionicons name="add" color="white" size={40} />
      </Button__TO>
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
  padding: 100px 30px 0px 30px;
  background-color: ${colors.bgColor};
`;

const Title__Text = styled.Text`
  margin-bottom: 100px;
  color: ${colors.textColor};
  font-size: 38px;
`;

const Button__TO = styled.TouchableOpacity`
  position: absolute;
  right: 50px;
  bottom: 50px;
  height: 80px;
  width: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${colors.btnColor};
  /* Shadow for Android */
  elevation: 5;
  /* Shadow for IOS */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
