import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { cardNames } from './card-names';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './nativagation/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
