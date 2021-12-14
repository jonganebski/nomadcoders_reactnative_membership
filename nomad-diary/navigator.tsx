import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home } from './screens/Home';
import { Write } from './screens/Write';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Write" component={Write} />
    </Stack.Navigator>
  );
};
