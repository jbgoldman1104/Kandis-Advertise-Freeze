import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AdminWallets from '../models/AdminWallets.model.js';

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

const message: string = 'You have no rights';

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		if (!req.headers.authorization) return res.status(401).json({ message });

		const token: string = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message });
		}

		const decoded = jwt.verify(token, `${ACCESS_TOKEN}`);
		// @ts-ignore
		let walletAddress = decoded.walletAddress;

		const isWalletUsed = await AdminWallets.findOne({
			wallet: walletAddress
		});

		if (!isWalletUsed) {
			return res.status(401).json({ message });
		}

		req.user = decoded;

		next();
	} catch (err: any) {
		return res.status(401).json({ message });
	}
}
