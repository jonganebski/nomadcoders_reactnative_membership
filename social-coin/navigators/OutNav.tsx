import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Join } from '../screens/Join';

const Nav = createNativeStackNavigator();

export enum OUT_NAV_SCREEN {
  LOG_IN = 'LOG_IN',
  JOIN = 'JOIN',
}

export type TOutNavParamList = {
  [OUT_NAV_SCREEN.LOG_IN]: undefined;
  [OUT_NAV_SCREEN.JOIN]: undefined;
};

export const OutNav = () => (
  <Nav.Navigator>
    <Nav.Screen name={OUT_NAV_SCREEN.LOG_IN} component={Login} />
    <Nav.Screen name={OUT_NAV_SCREEN.JOIN} component={Join} />
  </Nav.Navigator>
);
