import { Router } from 'express';
import { getAnalysisData } from '../controllers/analysisController';

const router = Router();

router.get('/:coinId/:days', getAnalysisData);

export default router;
