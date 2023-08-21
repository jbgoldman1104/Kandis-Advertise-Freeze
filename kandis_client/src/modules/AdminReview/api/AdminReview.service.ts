import { $host } from '../../../core/api/api';
import { IBannerPut } from '../types';

class AdminReviewService {
	getOne = async (bannerId: string) => {
		try {
			const { data: { banner } } = await $host.get(`/banner/getOne/${bannerId}`)

			return banner
		} catch(err: any) {
		    throw new Error(err)
		}
	}

	deleteOne = async (bannerId: string) => {
		try {
			const { data } = await $host.delete(`/banner/deleteOne/${bannerId}`)

			return data
		} catch(err: any) {
			throw new Error(err)
		}
	}

	updateBanner = async (dataPut: IBannerPut) => {
		try {
			const { data } = await $host.put(`/banner/updateBanner/${dataPut.bannerId}`, dataPut);

			return data
		} catch(err: any) {
			throw new Error(err)
		}
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AdminReviewService()