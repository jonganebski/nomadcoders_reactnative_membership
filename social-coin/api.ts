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

export interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: Links;
  links_extended: LinksExtended[];
  whitepaper: Whitepaper;
  first_data_at: Date;
  last_data_at: Date;
}

export interface Links {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
}

export interface LinksExtended {
  url: string;
  type: string;
  stats?: Stats;
}

export interface Stats {
  subscribers?: number;
  contributors?: number;
  stars?: number;
  followers?: number;
}

export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

export interface Team {
  id: string;
  name: string;
  position: string;
}

export interface Whitepaper {
  link: string;
  thumbnail: string;
}

export const info: QueryFunction<ICoinInfo, ['info', string]> = async ({
  queryKey,
}) => {
  const coinId = queryKey[1];
  const res = await fetch(`${COINS_URL}/${coinId}`);
  return res.json();
};

export interface ICoinHistory {
  timestamp: Date;
  price: number;
  volume_24h: number;
  market_cap: number;
}

export const history: QueryFunction<ICoinHistory[], ['history', string]> =
  async ({ queryKey }) => {
    const coinId = queryKey[1];
    const res = await fetch(
      `${BASE_URL}/tickers/${coinId}/historical?start=${
        new Date().toISOString().split('T')[0]
      }&interval=30m`
    );
    return res.json();
  };
