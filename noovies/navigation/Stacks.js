import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Two')}>
      <Text>Screen One</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Three')}>
      <Text>Screen Two</Text>
    </TouchableOpacity>
  );
};
const ScreenThree = ({ navigation: { setOptions } }) => {
  return (
    <TouchableOpacity onPress={() => setOptions({ title: 'Hello!' })}>
      <Text>Change Page Title</Text>
    </TouchableOpacity>
  );
};

export const Stacks = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="One" component={ScreenOne} />
      <Stack.Screen name="Two" component={ScreenTwo} />
      <Stack.Screen name="Three" component={ScreenThree} />
    </Stack.Navigator>
  );
};
