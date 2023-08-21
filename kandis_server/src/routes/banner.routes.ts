import { Router } from 'express';
import controller from '../controllers/banner.controller.js';
import { bannerUpload } from '../utils/uploadImg.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/add', bannerUpload.single('image'), controller.addBanner);
router.get('/getOne/:bannerId', controller.getBanner);
router.get('/getAll', controller.getAll);
router.delete('/deleteOne/:bannerId', authMiddleware, controller.deleteOne);
router.put('/updateBanner/:bannerId', authMiddleware, controller.updateBanner);

export default router;
