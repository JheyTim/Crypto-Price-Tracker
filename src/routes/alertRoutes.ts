import { Router } from 'express';
import {
  createAlert,
  deleteAlert,
  getAllAlerts,
} from '../controllers/alertController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authenticate, createAlert);
router.get('/view', authenticate, getAllAlerts);
router.delete('/:alertId', authenticate, deleteAlert);

export default router;
