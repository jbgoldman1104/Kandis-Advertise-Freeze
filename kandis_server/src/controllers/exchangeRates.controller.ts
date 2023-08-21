import { Request, Response } from 'express';
import { getLunaRates } from '../utils/getLunaRates.js';

class ExchangeRatesController {
	getLuna = async (req: Request, res: Response) => {
		try {
			const luna = await getLunaRates();

			res.json(luna);
		} catch (err) {
			res.status(400).json({ message: '' });
		}
	};
}

export default new ExchangeRatesController();
