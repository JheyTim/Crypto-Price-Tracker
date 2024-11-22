import CoinGeckoService from '../services/coinGeckoService';

async function testCoinGeckoService() {
  try {
    const prices = await CoinGeckoService.getSimplePrice(
      ['bitcoin', 'ethereum'],
      ['usd']
    );
    console.log('Simple Prices:', prices);

    const marketData = await CoinGeckoService.getCoinMarketData('usd', [
      'bitcoin',
      'ethereum',
    ]);
    console.log('Market Data:', marketData);

    const marketChart = await CoinGeckoService.getMarketChart(
      'bitcoin',
      'usd',
      7
    );
    console.log('Market Chart Data:', marketChart);

    const coinList = await CoinGeckoService.getCoinList();
    console.log('Coin List:', coinList.slice(0, 5)); // Print first 5 coins
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testCoinGeckoService();
