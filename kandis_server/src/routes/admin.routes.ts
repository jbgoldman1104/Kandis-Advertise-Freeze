import { Router } from 'express';
import controller from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/check', controller.checkAdmin);
router.post('/add', authMiddleware, controller.addAdmin);
router.get('/getWallets', authMiddleware, controller.getWallets);
router.delete(
	'/deleteWallet/:walletId',
	authMiddleware,
	controller.deleteWallet
);

export default router;
