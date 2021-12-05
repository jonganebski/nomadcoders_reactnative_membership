import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    WINDOW_HEIGHT: number;
    mainBgColor: string;
    textColor: string;
  }
}
