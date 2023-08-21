import { Request, Response } from 'express';
import AdminWallets from '../models/AdminWallets.model.js';
import { generateToken } from '../utils/generateToken.js';

class AdminController {
	checkAdmin = async (req: Request, res: Response) => {
		try {
			const { wallet } = req.body;

			const isWalletUsed = await AdminWallets.findOne({ wallet });

			if (!isWalletUsed) {
				return res
					.status(401)
					.json({ message: 'The wallet was not found in the database' });
			}

			const token = generateToken(wallet);

			return res.json({
				message: 'Successful authorization',
				token
			});
		} catch (err) {
			return res
				.status(400)
				.json({ message: 'The wallet was not found in the database' });
		}
	};

	addAdmin = async (req: Request, res: Response) => {
		try {
			const { wallet } = req.body;

			const isWalletInDb = await AdminWallets.findOne({ wallet });

			if (isWalletInDb) {
				return res.status(400).json({ message: 'This is wallet in Data Base' });
			}

			const newAdmin = await AdminWallets.create({
				wallet
			});

			await newAdmin.save();

			return res.json({
				message: 'Admin added successfully'
			});
		} catch (err) {
			return res.status(400).json({ message: 'Error creating admin' });
		}
	};

	getWallets = async (req: Request, res: Response) => {
		try {
			const wallets = await AdminWallets.find({});

			if (!wallets) {
				return res.status(404).json({ message: 'Wallets not found' });
			}

			return res.json(wallets);
		} catch (err) {
			return res.status(404).json({ message: 'Wallets not found' });
		}
	};

	deleteWallet = async (req: Request, res: Response) => {
		try {
			const { walletId } = req.params;

			const wallet = await AdminWallets.findOneAndDelete({ _id: walletId });

			if (!wallet) {
				return res.status(404).json({ message: 'Wallet not found' });
			}

			return res.json({ wallet, message: 'Wallet deleted successfully' });
		} catch (err) {
			return res.status(400).json({ message: 'Error while deleting' });
		}
	};
}

export default new AdminController();
