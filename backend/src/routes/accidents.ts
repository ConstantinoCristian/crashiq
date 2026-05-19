import { Router } from 'express';
import { getAccidents, getHotspots } from '../controllers/accidentsController';
const router = Router();
router.get('/', getAccidents);
router.get('/hotspots', getHotspots);
export default router;
