import { Router } from 'express';
import { predictRisk } from '../controllers/predictController';
const router = Router();
router.post('/', predictRisk);
export default router;
