import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Movies } from '../screens/Movies';
import { Search } from '../screens/Search';
import { TV } from '../screens/TV';
import { useColorScheme } from 'react-native';
import { RUSSIAN_PALETTE } from '../colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  // CMD + SHIFT + A 로 라이트모드/다크모드를 테스트 할 수 있다.
  // 강의에서는 완전한 커스텀 때문에 쓰지 않았지만, import { DarkTheme, DefaultTheme } from '@react-navigation/native'; 를 대신 사용할 수 있다.
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDarkMode ? RUSSIAN_PALETTE.biscay : 'white',
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? RUSSIAN_PALETTE.biscay : 'white',
        },
        tabBarActiveTintColor: isDarkMode ? '#f5cd79' : RUSSIAN_PALETTE.biscay,
        tabBarInactiveTintColor: RUSSIAN_PALETTE.pencilLead,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
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
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'film' : 'film-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'tv' : 'tv-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
