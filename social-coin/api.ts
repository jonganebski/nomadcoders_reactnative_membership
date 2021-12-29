import { QueryFunction } from 'react-query';

const BASE_URL = 'https://api.coinpaprika.com/v1';

const COINS_URL = `${BASE_URL}/coins`;

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_active: boolean;
  is_new: boolean;
  type: string;
}

export const coins = () => fetch(COINS_URL).then((res) => res.json());
