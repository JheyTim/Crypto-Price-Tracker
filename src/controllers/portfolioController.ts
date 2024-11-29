import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio';
import PortfolioHistory from '../models/PortfolioHistory';
import CoinGeckoService from '../services/coinGeckoService';

export const addPortfolioItem = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const { coinId, amount, averageBuyPrice } = req.body;
    const userId = req.userId;

    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      portfolio = new Portfolio({
        userId,
        holdings: [{ coinId, amount, averageBuyPrice }],
      });
    } else {
      const existingItem = portfolio.holdings.find(
        (item) => item.coinId === coinId
      );
      if (existingItem) {
        // Update the amount and recalculate the average buy price
        const totalAmount = existingItem.amount + amount;
        existingItem.averageBuyPrice =
          (existingItem.averageBuyPrice * existingItem.amount +
            averageBuyPrice * amount) /
          totalAmount;
        existingItem.amount = totalAmount;
      } else {
        portfolio.holdings.push({ coinId, amount, averageBuyPrice });
      }
    }

    await portfolio.save();

    res.json({ message: 'Portfolio updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update portfolio.' });
  }
};

export const removePortfolioItem = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const { coinId, amount } = req.body;
    const userId = req.userId;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      res.status(404).json({ error: 'Portfolio not found.' });
      return;
    }

    const existingItem = portfolio.holdings.find(
      (item) => item.coinId === coinId
    );

    if (!existingItem) {
      res.status(404).json({ error: 'Coin not found in portfolio.' });
      return;
    }

    if (existingItem.amount < amount) {
      res.status(400).json({ error: 'Insufficient amount to remove.' });
      return;
    }

    existingItem.amount -= amount;

    if (existingItem.amount === 0) {
      // Remove the holding if amount is zero
      portfolio.holdings = portfolio.holdings.filter(
        (item) => item.coinId !== coinId
      );
    }

    await portfolio.save();
    res.json({ message: 'Portfolio item updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update portfolio item.' });
  }
};

export const viewPortfolio = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      res.status(404).json({ error: 'Portfolio not found.' });
      return;
    }

    // Get current prices
    const coinIds = portfolio.holdings.map((item) => item.coinId);
    const prices = await CoinGeckoService.getSimplePrice(coinIds, ['usd']);

    // Calculate total value and individual holding values
    let totalValue = 0;
    const holdingsWithCurrentValue = portfolio.holdings.map((item) => {
      const currentPrice = prices[item.coinId]?.usd || 0;
      const holdingValue = item.amount * currentPrice;
      totalValue += holdingValue;

      const totalInvestment = item.amount * item.averageBuyPrice;
      const profitLoss = holdingValue - totalInvestment;
      const profitLossPercentage = (profitLoss / totalInvestment) * 100 || 0;

      return {
        coinId: item.coinId,
        amount: item.amount,
        averageBuyPrice: item.averageBuyPrice,
        currentPrice,
        holdingValue,
        profitLoss,
        profitLossPercentage,
      };
    });

    res.json({
      totalValue,
      holdings: holdingsWithCurrentValue,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve portfolio.' });
  }
};

export const getPortfolioHistory = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const history = await PortfolioHistory.find({ userId }).sort({ date: 1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve portfolio history.' });
  }
};
