import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Detail } from '../screens/Detail';
import { IN_NAV_SCREEN } from './screens';

const Nav = createNativeStackNavigator();

export const InNav = () => (
  <Nav.Navigator>
    <Nav.Screen name={IN_NAV_SCREEN.HOME} component={Home} />
    <Nav.Screen name={IN_NAV_SCREEN.DETAIL} component={Detail} />
  </Nav.Navigator>
);
