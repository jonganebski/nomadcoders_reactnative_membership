import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { cardNames } from '../card-names';

// TouchableOpacity 자체에 Animated를 주면 잘 되지 않는다. TouchableOpacity 자체의 애니매이션도 처리해야 되기 때문.
// 그래서 보통 Animated.View를 감싸는 방식을 쓴다.

// Interpolation
// [-300, 0, 300] => [1, 0, 1]

// Some properties like 'background-color' cannot be animated with native driver. So we need to set 'useNativeDriver: false'(default) in these cases.

// Animated.spring takes long time to finish. This might make user to feel that the app is slow.
// To fix this, we use restSpeedThreshold and restDisplacementThreshold.
// restSpeedThreshold: 애니매이션의 속도가 초당 0.001픽셀(기본값)에까지 다다르기 전에 spring 애니매이션이 끝난 것으로 간주시킬 수 있게 함.
// restDisplacementThreshold: 애니매이션의 거리가 초당 0.001픽셀(기본값)에까지 다다르기 전에 spring 애니매이션이 끝난 것으로 간주시킬 수 있게 함.

const { width } = Dimensions.get('window');

export const Cards = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotateZ = translateX.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    extrapolate: 'clamp', // Behavior of the outputRange in case of exceeds inputRange.
  });

  const nextCardScale = translateX.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  });

  const cardAnim = useRef({
    scaleDown: Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }),
    initScale: Animated.spring(scale, {
      useNativeDriver: true,
      toValue: 1,
    }),
    initTranslateX: Animated.spring(translateX, {
      useNativeDriver: true,
      toValue: 0,
    }),
    goodByeToLeft: Animated.spring(translateX, {
      restDisplacementThreshold: 100,
      useNativeDriver: true,
      toValue: -400,
      tension: 5,
    }),
    goodByeToRight: Animated.spring(translateX, {
      restDisplacementThreshold: 100,
      useNativeDriver: true,
      toValue: 400,
      tension: 5,
    }),
  }).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        cardAnim.scaleDown.start();
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -180) {
          cardAnim.goodByeToLeft.start();
          switchToNextCard();
          return;
        }
        if (180 < dx) {
          cardAnim.goodByeToRight.start();
          switchToNextCard();
          return;
        }
        Animated.parallel([
          cardAnim.initTranslateX,
          cardAnim.initScale,
        ]).start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        translateX.setValue(dx);
      },
    })
  ).current;

  const onPressClose = () => {
    cardAnim.goodByeToLeft.start(() => switchToNextCard());
  };

  const onPressCheck = () => {
    cardAnim.goodByeToRight.start(() => switchToNextCard());
  };

  const [index, setIndex] = useState(0);

  /**
   * The main trick.
   * In this way, we can bind panHandlers on the only one component. And we just switch the icon.
   * Also, we don't need to render all icons at once.
   */
  const switchToNextCard = () => {
    setIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex;
    });
    translateX.setValue(0);
    scale.setValue(1);
  };

  return (
    <Container__View>
      <CardContainer__View>
        <Card__AnimatedView style={{ transform: [{ scale: nextCardScale }] }}>
          <Ionicons name={cardNames[index + 1]} color="#192a56" size={98} />
        </Card__AnimatedView>
        <Card__AnimatedView
          {...panResponder.panHandlers}
          style={{ transform: [{ scale }, { translateX }, { rotateZ }] }}
        >
          <Ionicons name={cardNames[index]} color="#192a56" size={98} />
        </Card__AnimatedView>
      </CardContainer__View>
      <ButtonContainer__View>
        <Button__TO onPress={onPressClose}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Button__TO>
        <Button__TO onPress={onPressCheck}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Button__TO>
      </ButtonContainer__View>
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #00a8ff;
`;

const CardContainer__View = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

const Card__AnimatedView = styled(Animated.View)`
  position: absolute;
  height: 300px;
  width: 300px;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.3);
`;

const ButtonContainer__View = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Button__TO = styled.TouchableOpacity`
  margin: 0px 10px;
`;
