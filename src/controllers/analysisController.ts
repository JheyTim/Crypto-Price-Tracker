// src/controllers/analysisController.ts

import { Request, Response } from 'express';
import HistoricalPrice from '../models/HistoricalPrice';
import {
  calculateSimpleMovingAverage,
  calculateExponentialMovingAverage,
  calculateVolatility,
} from '../utils/analysis';

export const getAnalysisData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { coinId, days } = req.params;
    const windowSize = parseInt(req.query.windowSize as string) || 7;

    const historicalData = await HistoricalPrice.findOne({ coinId });

    if (!historicalData) {
      res.status(404).json({ error: 'Historical data not found.' });
      return;
    }

    // Extract price data for the specified number of days
    const pricesData = historicalData.prices.slice(-parseInt(days));
    const prices = pricesData.map((entry) => entry[1]);

    // Calculate indicators
    const sma = calculateSimpleMovingAverage(prices, windowSize);
    const ema = calculateExponentialMovingAverage(prices, windowSize);
    const volatility = calculateVolatility(prices);

    res.json({
      coinId,
      days,
      windowSize,
      sma,
      ema,
      volatility,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve analysis data.' });
  }
};
