import { ConnectButton } from './styles'
import { useAppDispatch } from '../../core/hooks/storeHooks'
import { setWalletModal } from '../../core/redux/slices/ModalSlice'
import { useWalletConnect } from '../../core/hooks/useWalletConnect'
import { ReactComponent as IcWallet } from '../../assets/icons/ic_wallet.svg';

const ConnectWallet = () => {
	const dispatch = useAppDispatch()
	const { isWalletConnect } = useWalletConnect()


	const openWalletModal = () => {
		dispatch(setWalletModal(true))
	}

	return (
		<>
			<ConnectButton onClick={openWalletModal}>
				<IcWallet	/>
				<i>{isWalletConnect ? 'Connected' : 'Connect Wallet'}</i>
			</ConnectButton>
		</>
	)
}

export default ConnectWallet
