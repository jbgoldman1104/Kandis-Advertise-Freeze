import { $host } from '../../../core/api/api';
import { IAdmin } from '../types';

class AdminListService {
	getAll = async () => {
		try {
			const { data } = await $host.get<IAdmin[]>('/admin/getWallets')

			return data
		} catch(err: any) {
		    throw new Error(err)
		}
	}

	deleteWallet = async (walletId: string) => {
		try {
			return $host.delete(`/admin/deleteWallet/${walletId}`)
		} catch(err: any) {
			throw new Error(err)
		}
	}

	addAdmin = async (walletAddress: string) => {
		try {
			const { data } = await $host.post('/admin/add', { wallet: walletAddress })

			return data
		} catch(err: any) {
			throw new Error(err)
		}
	}
}

export default new AdminListService()