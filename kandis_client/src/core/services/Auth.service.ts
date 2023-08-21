import { $host } from '../api/api';

class AuthService {
	check = async (lunaAddress: string) => {
		try {
			const { data } = await $host.post('admin/check', { wallet: lunaAddress })

			return data
		} catch (error) {
			if (typeof error === 'string') {
				throw new Error(error);
			} else {
				throw error;
			}
		}
	};
}

export default new AuthService();
