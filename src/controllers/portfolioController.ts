import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio';

export const addPortfolioItem = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const { coinId, amount } = req.body;
    const userId = req.userId;

    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      portfolio = new Portfolio({ userId, holdings: [{ coinId, amount }] });
    } else {
      const existingItem = portfolio.holdings.find(
        (item) => item.coinId === coinId
      );

      if (existingItem) {
        existingItem.amount += amount;
      } else {
        portfolio.holdings.push({ coinId, amount });
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
    const { coinId } = req.body;
    const userId = req.userId;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      res.status(404).json({ error: 'Portfolio not found.' });
      return;
    }

    portfolio.holdings = portfolio.holdings.filter(
      (item) => item.coinId !== coinId
    );

    await portfolio.save();
    res.json({ message: 'Portfolio item removed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove portfolio item.' });
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

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve portfolio.' });
  }
};
