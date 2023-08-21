import { Router } from 'express';
import controller from '../controllers/exchangeRates.controller.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

router.get('/luna', cacheMiddleware(3600), controller.getLuna);

export default router;
