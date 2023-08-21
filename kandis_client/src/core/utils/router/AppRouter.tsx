import { router, privateRouter } from './router';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import React from 'react';
import { BannerReview } from '../../../modules/BannerReview';


const AppRouter = () => {
	const location = useLocation()
	const previousLocation = location.state?.previousLocation;

	return (
		<>
			<Routes location={previousLocation || location}>
				{router.map((route, index) => {
					return <Route
						key={index}
						path={route.path}
						element={route.element} />;
				})}
				{
					privateRouter.map((route, index) => {
						return <Route
							key={index}
							path={route.path}
							element={<PrivateRouteAdmin children={route.element} />}
						/>;
					})
				}
			</Routes>
		</>
	);
};

export default AppRouter;