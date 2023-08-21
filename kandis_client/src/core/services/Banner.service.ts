import { $host } from '../api/api';
import { IBanner } from '../../modules/AddBannerForm/types';

class BannerService {
	getAll = async (status?: string) => {
		try {
			const { data } = await $host.get<IBanner[]>(`/banner/getAll`, {
				params: {
					status
				}
			})

			return data
		} catch(err: any) {
		    throw new Error(err)
		}
	}
}

export default new BannerService()