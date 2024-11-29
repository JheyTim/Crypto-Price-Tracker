import { Request, Response } from 'express';
import Alert from '../models/Alert';

export const createAlert = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const { coinId, targetPrice, direction } = req.body;
    const userId = req.userId;

    const alert = new Alert({
      userId,
      coinId,
      targetPrice,
      direction,
    });

    await alert.save();
    res.status(201).json({ message: 'Alert created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create alert.' });
  }
};

export const getAllAlerts = async (
  _req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const alerts = await Alert.find();

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve alerts' });
  }
};

export const deleteAlert = async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const { alertId } = req.params;
    const userId = req.userId;

    const result = await Alert.deleteOne({ _id: alertId, userId });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Alert not found.' });
      return;
    }

    res.json({ message: 'Alert deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete alert.' });
  }
};
