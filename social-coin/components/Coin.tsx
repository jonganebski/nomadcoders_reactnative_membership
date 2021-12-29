import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Coin: React.FC<{ symbol: string; index: number }> = ({
  symbol,
  index,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  return (
    <Container__View style={{ opacity, transform: [{ scale }] }}>
      <CoinIcon__Image
        source={{
          uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
        }}
      />
      <CoinSymbol__Text>{symbol}</CoinSymbol__Text>
    </Container__View>
  );
};

const Container__View = styled(Animated.View)`
  flex: 0.31;
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
