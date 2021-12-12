import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Cards } from '../screens/Cards';
import { DnD } from '../screens/DnD';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Cards" component={Cards} />
      <Tab.Screen name="DnD" component={DnD} />
    </Tab.Navigator>
  );
};
