import CoinGeckoService from '../services/coinGeckoService';
import WebSocketServer from '../websocketServer';
import nodeCron from 'node-cron';
import logger from '../utils/logger';

class PriceUpdater {
  constructor(private readonly wsServer: WebSocketServer) {}

  public start(): void {
    // Schedule the task to run every minute
    nodeCron.schedule('* * * * *', this.updatePrices.bind(this));
  }

  private async updatePrices(): Promise<void> {
    logger.info('Fetching latest prices...');
    try {
      const prices = await CoinGeckoService.getSimplePrice(
        ['bitcoin', 'ethereum'],
        ['usd']
      );

      // Broadcast the prices to all connected clients
      this.wsServer.broadcast({
        type: 'PRICE_UPDATE',
        data: prices,
      });
    } catch (error) {
      logger.error('Error fetching prices:', error);
    }
  }
}

export default PriceUpdater;
