import { $host } from '../../../core/api/api';

class BannerReviewService {
	getOne = async (bannerId: string) => {
		try {
			const { data } = await $host.get(`/banner/getOne/${bannerId}`)

			return data
		} catch(err: any) {
		    throw new Error(err)
		}
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BannerReviewService()