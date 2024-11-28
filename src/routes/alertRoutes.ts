import { Router } from 'express';
import { createAlert, deleteAlert } from '../controllers/alertController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authenticate, createAlert);
router.delete('/:alertId', authenticate, deleteAlert);

export default router;
