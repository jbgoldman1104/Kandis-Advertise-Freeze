import { query, Request, Response } from 'express';
import Banner from '../models/Banner.model.js';

interface TimeLeft {
	leftHours: number;
	leftMinutes: number;
}

class BannerController {
	addBanner = async (req: Request, res: Response) => {
		try {
			const { description, websiteLink, email, timeLive } = req.body;

			if (!req.file) {
				return res.status(400).json({ message: 'Image not found' });
			}

			const imageURL = `/static/banners/${req.file.originalname}`;

			const newBanner = await Banner.create({
				imageURL,
				description,
				websiteLink,
				email,
				timeLive
			});

			await newBanner.save();

			return res.json({
				message: 'Banner added successfully'
			});
		} catch (err) {
			res.status(400).json({ message: 'Installation error' });
		}
	};

	getBanner = async (req: Request, res: Response) => {
		try {
			const { bannerId } = req.params;

			const banner = await Banner.findOne({ _id: bannerId });
			const timeToDelete: any = {};

			if (!banner) {
				return res.status(404).json({ message: 'Banner not found' });
			}

			if (banner.expireAt) {
				const expireDate = new Date(banner.expireAt).getTime();
				const now = new Date().getTime();
				const timeDiff = expireDate - now;

				timeToDelete.leftHours = Math.floor(timeDiff / (1000 * 60 * 60));
				timeToDelete.leftMinutes = Math.floor((timeDiff / 1000 / 60) % 60);
				timeToDelete.leftSeconds = Math.floor((timeDiff / 1000) % 60);
			}

			return res.json({ banner, timeToDelete });
		} catch (err) {
			return res.status(404).json({ message: 'Banner not found' });
		}
	};

	getAll = async (req: Request, res: Response) => {
		try {
			const { status } = req.query;
			let banners;

			if (!status) {
				banners = await Banner.find({});
			} else {
				banners = await Banner.find({ status });
			}

			if (!banners) {
				return res.status(404).json({ message: 'Banners not found' });
			}

			return res.json(banners);
		} catch (err) {
			return res.status(404).json({ message: 'Banners not found' });
		}
	};

	deleteOne = async (req: Request, res: Response) => {
		try {
			const { bannerId } = req.params;

			const banner = await Banner.findOneAndDelete({ _id: bannerId });

			if (!banner) {
				return res.status(404).json({ message: 'Banner not found' });
			}

			return res.json({ banner, message: 'Banner deleted successfully' });
		} catch (err) {
			return res.status(404).json({ message: 'Banner not found' });
		}
	};

	updateBanner = async (req: Request, res: Response) => {
		try {
			const { bannerId } = req.params;
			const { description, websiteLink, email } = req.body;

			const banner = await Banner.findOne({ _id: bannerId });

			if (!banner) {
				return res.status(404).json({ message: 'Banner not found' });
			}

			const expireAt = new Date();
			expireAt.setHours(expireAt.getHours() + Number(banner.timeLive));

			const updatedBanner = await Banner.findByIdAndUpdate(bannerId, {
				status: 'production',
				description,
				websiteLink,
				email,
				expireAt
			});

			if (!updatedBanner) {
				return res.status(404).json({ message: 'Banner not found' });
			}

			return res.json({
				updatedBanner,
				message: 'Banner updated successfully'
			});
		} catch (err) {
			res
				.status(400)
				.json({ message: 'An error occurred while updating the banner' });
		}
	};
}

export default new BannerController();
