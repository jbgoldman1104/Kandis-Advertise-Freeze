import axios from 'axios';

const REQUEST_URL =
	'https://api.coingecko.com/api/v3/simple/price?ids=terra-luna-2&vs_currencies=usd';

export const getLunaRates = async () => {
	try {
		const { data } = await axios.get(REQUEST_URL);

		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};
