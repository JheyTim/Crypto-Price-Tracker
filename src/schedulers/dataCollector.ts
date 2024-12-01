import nodeCron from 'node-cron';
import CoinGeckoService from '../services/coinGeckoService';
import HistoricalPrice from '../models/HistoricalPrice';
import logger from '../utils/logger';

class DataCollector {
  public start() {
    // Schedule the task to run once a day at 1 AM
    nodeCron.schedule('0 1 * * *', async () => {
      logger.info('Collecting historical price data...')

      try {
        const coinIds = ['bitcoin', 'ethereum']; // Add more coin IDs as needed

        for (const coinId of coinIds) {
          const data = await CoinGeckoService.getMarketChart(
            coinId,
            'usd',
            '1' // Fetch data for the last 1 day
          );

          // Save data to the database
          await HistoricalPrice.updateOne(
            { coinId },
            { $push: { prices: { $each: data.prices } } },
            { upsert: true }
          );
        }
      } catch (error) {
        logger.error('Error collecting historical data:', error)
      }
    });
  }
}

export default DataCollector;
