import { $host } from '../../../core/api/api';
import { IBanner } from '../types';

export const addBanner = async (data: IBanner) => {
	try {
		return await $host.post('/banner/add', data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
	} catch(err: any) {
	    throw new Error(err)
	}
}