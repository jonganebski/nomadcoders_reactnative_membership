import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const ScreenOne: React.FC<NativeStackScreenProps<any, 'One'>> = ({
  navigation,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Two')}>
      <Text>Screen One</Text>
    </TouchableOpacity>
  );
};
const ScreenTwo: React.FC<NativeStackScreenProps<any, 'Two'>> = ({
  navigation,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Three')}>
      <Text>Screen Two</Text>
    </TouchableOpacity>
  );
};
const ScreenThree: React.FC<NativeStackScreenProps<any, 'Three'>> = ({
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.setOptions({ title: 'Hello!' })}
    >
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
