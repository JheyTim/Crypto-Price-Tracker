import nodeCron from 'node-cron';
import Portfolio from '../models/Portfolio';
import PortfolioHistory from '../models/PortfolioHistory';
import CoinGeckoService from '../services/coinGeckoService';

class PortfolioHistoryUpdater {
  public start() {
    // Schedule the task to run every day at midnight
    nodeCron.schedule('0 0 * * *', async () => {
      console.log('Saving portfolio history...');
      try {
        // Fetch all portfolios
        const portfolios = await Portfolio.find();

        for (const portfolio of portfolios) {
          // Get current prices
          const coinIds = portfolio.holdings.map((item) => item.coinId);
          const prices = await CoinGeckoService.getSimplePrice(coinIds, [
            'usd',
          ]);

          // Calculate total value and individual holding values
          let totalValue = 0;
          const holdings = portfolio.holdings.map((item) => {
            const currentPrice = prices[item.coinId]?.usd || 0;
            const holdingValue = item.amount * currentPrice;
            totalValue += holdingValue;
            return {
              coinId: item.coinId,
              amount: item.amount,
              value: holdingValue,
            };
          });

          // Save to PortfolioHistory
          const portfolioHistory = new PortfolioHistory({
            userId: portfolio.userId,
            date: new Date(),
            totalValue,
            holdings,
          });

          await portfolioHistory.save();
        }
      } catch (error) {
        console.error('Error saving portfolio history:', error);
      }
    });
  }
}

export default PortfolioHistoryUpdater;
