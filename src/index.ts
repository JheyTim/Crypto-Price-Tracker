import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import CoinGeckoService from './services/coinGeckoService';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.send('Cryptocurrency Price Tracker API is running.');
});

app.get('/api/prices', async (req, res) => {
  try {
    const prices = await CoinGeckoService.getSimplePrice(
      ['bitcoin', 'ethereum'],
      ['usd']
    );
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
