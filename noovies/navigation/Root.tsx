import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tabs } from './Tabs';
import { Stacks, StackScreen } from './Stacks';
import { DetailScreenParamList } from '../screens/Detail';

export type RootParamList = {
  Stacks: { screen: StackScreen; params: DetailScreenParamList };
};

const Nav = createNativeStackNavigator();

export const Root = () => {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stacks" component={Stacks} />
    </Nav.Navigator>
  );
};
