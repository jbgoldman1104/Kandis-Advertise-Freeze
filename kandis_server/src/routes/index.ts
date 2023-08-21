import { Router } from 'express';
import adminRoutes from './admin.routes.js';
import bannerRoutes from './banner.routes.js';
import exchangeRatesRoutes from './exchangeRates.routes.js';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/banner', bannerRoutes);
router.use('/exchangeRates', exchangeRatesRoutes);

export default router;
