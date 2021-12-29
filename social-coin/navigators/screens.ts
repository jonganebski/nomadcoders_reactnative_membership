export enum OUT_NAV_SCREEN {
  LOG_IN = 'LOG_IN',
  JOIN = 'JOIN',
}

export type TOutNavParamList = {
  [OUT_NAV_SCREEN.LOG_IN]: undefined;
  [OUT_NAV_SCREEN.JOIN]: undefined;
};

export enum IN_NAV_SCREEN {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
}

export type TInNavParamList = {
  [IN_NAV_SCREEN.HOME]: undefined;
  [IN_NAV_SCREEN.DETAIL]: { id: string; symbol: string };
};
