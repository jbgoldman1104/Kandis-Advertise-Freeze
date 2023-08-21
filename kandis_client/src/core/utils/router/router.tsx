import Home from '../../../screens/Home/Home'
import Advertise from '../../../screens/Advertise/Advertise'
import Freeze from '../../../screens/Freeze/Freeze'
import Admin from '../../../screens/Admin/Admin';
import { BannerReview } from '../../../modules/BannerReview';

export const router = [
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/advertise',
		element: <Advertise />
	},
	{
		path: '/freeze',
		element: <Freeze />
	},
	// {
	// 	path: '/banner/:bannerId',
	// 	element: <BannerReview />
	// }
]

export const privateRouter = [
	{
		path: '/admin',
		element: <Admin />
	}
]
