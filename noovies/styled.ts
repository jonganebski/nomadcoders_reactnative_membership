import { RUSSIAN_PALETTE } from './colors';
import { DefaultTheme } from 'styled-components';
import { Dimensions } from 'react-native';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export const lightTheme: DefaultTheme = {
  WINDOW_HEIGHT,
  mainBgColor: 'white',
  textColor: RUSSIAN_PALETTE.biscay,
};

export const darkTheme: DefaultTheme = {
  WINDOW_HEIGHT,
  mainBgColor: RUSSIAN_PALETTE.biscay,
  textColor: RUSSIAN_PALETTE.summerTime,
};
