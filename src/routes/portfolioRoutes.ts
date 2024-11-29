import { Router } from 'express';
import {
  addPortfolioItem,
  removePortfolioItem,
  viewPortfolio,
  getPortfolioHistory
} from '../controllers/portfolioController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, addPortfolioItem);
router.post('/remove', authenticate, removePortfolioItem);
router.get('/view', authenticate, viewPortfolio);
router.get('/history', authenticate, getPortfolioHistory);

export default router;
