export interface SimplePriceResponse {
  [id: string]: {
    [vsCurrency: string]: number;
  };
}

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  // Add other fields as needed
}

export interface MarketChartResponse {
  prices: [number, number][];
  // Include other fields like market_caps, total_volumes if needed
}
