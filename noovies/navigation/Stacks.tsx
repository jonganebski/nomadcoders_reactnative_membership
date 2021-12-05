import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/routers';
import React from 'react';
import { useColorScheme } from 'react-native';
import { RUSSIAN_PALETTE } from '../colors';
import { Detail, DetailScreenParamList } from '../screens/Detail';

export type StackScreen = keyof StackParamList;

export type StackParamList = {
  Detail: DetailScreenParamList;
};

const Stack = createNativeStackNavigator();

export const Stacks = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode ? RUSSIAN_PALETTE.biscay : 'white',
        },
        headerTitleStyle: {
          color: isDarkMode
            ? RUSSIAN_PALETTE.summerTime
            : RUSSIAN_PALETTE.biscay,
        },
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
