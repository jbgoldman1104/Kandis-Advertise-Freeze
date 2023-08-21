import React, { useEffect, useState } from 'react';
import Wrapper from './containers/Wrapper/Wrapper';
import Navbar from './layouts/Navbar/Navbar';
import WalletConnectModal from './layouts/WalletConnectModal/WalletConnectModal';
import MobileMenu from './layouts/MobileMenu/MobileMenu';
import { useWalletConnect } from './core/hooks/useWalletConnect';
import AuthService from './core/services/Auth.service';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from './core/hooks/storeHooks';
import { setAdmin, setLoading } from './core/redux/slices/AuthSlice';
import AppRouter from './core/utils/router/AppRouter';
import Loader from './components/Loader/Loader';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { AdminList } from './modules/AdminList';
import { useQuery } from '@tanstack/react-query';
import ExchangeRatesService from './core/services/ExchangeRates.service';
import { setLunaCoin } from './core/redux/slices/ExchangeRatesSlice';

const App = () => {
	const { isWalletConnect } = useWalletConnect();
	const { isLoading } = useAppSelector(state => state.AuthSlice);
	const { wallets, status } = useWallet();
	const dispatch = useAppDispatch();
	const { data } = useQuery(['get luna coin'],
		() => ExchangeRatesService.getLuna(),
		{
			onSuccess: (res) => {
				dispatch(setLunaCoin(res['terra-luna-2'].usd))
			}
		}
	);

	useEffect(() => {
		if (status !== WalletStatus.INITIALIZING) {

			const address = wallets[0] ? wallets[0].addresses['columbus-5'] || wallets[0].addresses['rebel-2'] : '';

			AuthService
				.check(address)
				.then(res => {
					const { token } = res;

					Cookies.set('token', token, { expiresIn: '10d' });
					dispatch(setAdmin(true));
				})
				.catch(err => {
					dispatch(setAdmin(false));
				})
				.finally(() => {
					dispatch(setLoading(false));
				});
		}
	}, [dispatch, isWalletConnect, status, wallets]);

	return (
		<>
			{
				isLoading ?
					<Loader />
					:
					<Wrapper>

						<Navbar />

						<AppRouter />

						<WalletConnectModal />
						<MobileMenu />
						<AdminList />
					</Wrapper>
			}
		</>
	);
};

export default App;
