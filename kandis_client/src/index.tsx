import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.scss';
import { BrowserRouter } from 'react-router-dom';
import {
	getChainOptions,
	WalletProvider
} from '@terra-money/wallet-provider';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './core/redux/store';
import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

getChainOptions().then((chainOptions) => {
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<WalletProvider {...chainOptions}>
						<Provider store={store}>
							<HelmetProvider>
								<App />
							</HelmetProvider>
						</Provider>
					</WalletProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
});

