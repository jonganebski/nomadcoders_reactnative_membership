import { RUSSIAN_PALETTE } from './colors';
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  mainBgColor: 'white',
  textColor: RUSSIAN_PALETTE.biscay,
};

export const darkTheme: DefaultTheme = {
  mainBgColor: RUSSIAN_PALETTE.biscay,
  textColor: RUSSIAN_PALETTE.summerTime,
};
