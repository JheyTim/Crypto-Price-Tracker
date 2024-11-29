import nodeCron from 'node-cron';
import Alert from '../models/Alert';
import CoinGeckoService from '../services/coinGeckoService';
import User from '../models/User';

class AlertChecker {
  public start() {
    // Schedule the task to run every minute
    nodeCron.schedule('* * * * *', async () => {
      console.log('Checking alerts...');
      try {
        // Step 1: Fetch all active alerts
        const alerts = await Alert.find().populate('userId');

        if (alerts.length === 0) {
          console.log('No alerts to process.');
          return;
        }

        // Step 2: Get unique coin IDs from alerts
        const coinIds = [...new Set(alerts.map((alert) => alert.coinId))];

        // Step 3: Fetch current prices for these coins
        const prices = await CoinGeckoService.getSimplePrice(coinIds, ['usd']);

        // Step 4: Check each alert
        for (const alert of alerts) {
          const currentPrice = prices[alert.coinId]?.usd;

          if (typeof currentPrice === 'undefined') {
            console.warn(`Price for ${alert.coinId} not found`);
            continue;
          }

          let conditionMet = false;

          if (
            alert.direction === 'above' &&
            currentPrice >= alert.targetPrice
          ) {
            conditionMet = true;
          } else if (
            alert.direction === 'below' &&
            currentPrice <= alert.targetPrice
          ) {
            conditionMet = true;
          }

          if (conditionMet) {
            // Step 5: Send notification (You can use email or sms notification, for now I used console.log)
            console.log(
              `Your alert for ${alert.coinId} has been triggered.\n\nCurrent Price: $${currentPrice}\nTarget Price: $${alert.targetPrice}\nDirection: ${alert.direction}\n\nThank you for using our service!`
            );

            // Step: 6: Remove the alert
            await Alert.deleteOne({ _id: alert._id });
          }
        }
      } catch (error) {
        console.error('Error checking alerts:', error);
      }
    });
  }
}

export default AlertChecker;
