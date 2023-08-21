import multer from 'multer';
import fs from 'fs';

const bannerStorage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('static/banners')) {
			fs.mkdirSync('static/banners');
		}
		cb(null, 'static/banners');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	}
});

export const bannerUpload = multer({ storage: bannerStorage });
