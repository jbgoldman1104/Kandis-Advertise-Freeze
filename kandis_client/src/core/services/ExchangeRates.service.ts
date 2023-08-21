import { $host } from '../api/api';

class ExchangeRatesService {
	getLuna = async () => {
		try {
			const { data } = await $host.get('/exchangeRates/luna');

			return data
		} catch(err: any) {
			throw new Error(err);
		}
	}
}

export default new ExchangeRatesService();