import { Router } from 'express';
import {
  addPortfolioItem,
  removePortfolioItem,
  viewPortfolio,
} from '../controllers/portfolioController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, addPortfolioItem);
router.post('/remove', authenticate, removePortfolioItem);
router.get('/view', authenticate, viewPortfolio);

export default router;
