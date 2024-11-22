import axios from 'axios';
import {
  SimplePriceResponse,
  CoinMarketData,
  MarketChartResponse,
} from '../types/coinGecko';

const BASE_URL = 'https://api.coingecko.com/api/v3';

class CoinGeckoService {
  // Fetch current prices for a list of coin IDs
  static async getSimplePrice(
    ids: string[],
    vsCurrencies: string[]
  ): Promise<SimplePriceResponse> {
    try {
      const params = {
        ids: ids.join(','),
        vs_currencies: vsCurrencies.join(','),
      };

      const response = await axios.get<SimplePriceResponse>(
        `${BASE_URL}/simple/price`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching simple price data:', error);
      throw error;
    }
  }

  // Fetch market data for coins
  static async getCoinMarketData(
    vsCurrency: string,
    ids: string[]
  ): Promise<CoinMarketData[]> {
    try {
      const params = {
        vs_currency: vsCurrency,
        ids: ids.join(','),
      };

      const response = await axios.get<CoinMarketData[]>(
        `${BASE_URL}/coins/markets`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching coin market data:', error);
      throw error;
    }
  }

  // Fetch historical market chart data
  static async getMarketChart(
    coinId: string,
    vsCurrency: string,
    days: number
  ): Promise<MarketChartResponse> {
    try {
      const params = {
        vs_currency: vsCurrency,
        days: days.toString(),
      };

      const response = await axios.get<MarketChartResponse>(
        `${BASE_URL}/coins/${coinId}/market_chart`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching market chart:', error);
      throw error;
    }
  }

  // Fetch list of all coins
  static async getCoinList(): Promise<
    { id: string; symbol: string; name: string }[]
  > {
    try {
      const response = await axios.get(`${BASE_URL}/coins/list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coin list:', error);
      throw error;
    }
  }
}

export default CoinGeckoService;
