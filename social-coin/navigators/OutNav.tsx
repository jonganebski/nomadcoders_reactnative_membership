import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Join } from '../screens/Join';
import { OUT_NAV_SCREEN } from './screens';

const Nav = createNativeStackNavigator();

export const OutNav = () => (
  <Nav.Navigator>
    <Nav.Screen name={OUT_NAV_SCREEN.LOG_IN} component={Login} />
    <Nav.Screen name={OUT_NAV_SCREEN.JOIN} component={Join} />
  </Nav.Navigator>
);
