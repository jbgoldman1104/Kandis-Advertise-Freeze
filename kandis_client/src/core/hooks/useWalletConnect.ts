import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { useEffect, useState } from 'react';

export const useWalletConnect = () => {
	const [isWalletConnect, setIsWalletConnect] = useState<boolean>(false)
	const [lunaAddress, setLunaAddress] = useState<string | null>(null)
	const { status, wallets } = useWallet()


	useEffect(() => {
		if (status === WalletStatus.WALLET_CONNECTED) {
			const { addresses } = wallets[0]
			setLunaAddress(addresses['columbus-5'] || addresses['rebel-2'])
			//console.log(addresses)
		}
	}, [wallets, isWalletConnect])

	useEffect(() => {
		if (status === WalletStatus.WALLET_NOT_CONNECTED) {
			setIsWalletConnect(false)
		} else if (status === WalletStatus.WALLET_CONNECTED) {
			setIsWalletConnect(true)
		}
	}, [status])

	return {
		isWalletConnect,
		lunaAddress
	}
}
