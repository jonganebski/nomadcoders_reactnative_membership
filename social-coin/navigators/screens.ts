export enum OUT_NAV_SCREEN {
  LOG_IN = 'LOG_IN',
  JOIN = 'JOIN',
}

export type TOutNavParamList = {
  [OUT_NAV_SCREEN.LOG_IN]: undefined;
  [OUT_NAV_SCREEN.JOIN]: undefined;
};
