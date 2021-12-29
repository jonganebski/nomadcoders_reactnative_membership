import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { IN_NAV_SCREEN, TInNavParamList } from '../navigators/screens';

export const Coin: React.FC<{ id: string; symbol: string; index: number }> = ({
  symbol,
  index,
  id,
}) => {
  const { navigate } = useNavigation<NavigationProp<TInNavParamList>>();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      delay: Math.min(index * 100, 2000),
      useNativeDriver: true,
    }).start();
  }, []);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  const onPress = () => {
    navigate(IN_NAV_SCREEN.DETAIL, { symbol, id });
  };
  return (
    <TouchableOpacity style={{ flex: 0.31 }} onPress={onPress}>
      <Container__View style={{ opacity, transform: [{ scale }] }}>
        <CoinIcon__Image
          source={{
            uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
        <CoinSymbol__Text>{symbol}</CoinSymbol__Text>
      </Container__View>
    </TouchableOpacity>
  );
};

const Container__View = styled(Animated.View)`
  align-items: center;
  padding: 15px 0px;
  background-color: steelblue;
`;
const CoinName__Text = styled.Text`
  color: white;
`;
const CoinSymbol__Text = styled.Text`
  color: white;
`;
const CoinIcon__Image = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: 10px;
  border-radius: 16px;
`;
