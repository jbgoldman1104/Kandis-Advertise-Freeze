import { useWallet } from '@terra-money/wallet-provider';
import { useWalletConnect } from '../../core/hooks/useWalletConnect';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { setMobileMenu, setWalletModal } from '../../core/redux/slices/ModalSlice';
import { MenuButton, MenuWrapper, MobileModal } from './styles';
import { ReactComponent as IcWallet } from '../../assets/icons/ic_wallet_yellow.svg';
import { ReactComponent as IcPerson } from '../../assets/icons/ic_person.svg';
import { ReactComponent as IcDisconnect } from '../../assets/icons/ic_disconnect_yellow.svg'
import { ReactComponent as IcAdvertise } from '../../assets/icons/ic_advertise.svg';
import { ReactComponent as IcFreeze } from '../../assets/icons/ic_freeze.svg';
import { ReactComponent as IcDocs } from '../../assets/icons/ic_docs.svg';
import { ReactComponent as IcContactUs } from '../../assets/icons/ic_pencil.svg';
import Cookies from 'js-cookie';

const MobileMenu = () => {
	const { disconnect } = useWallet();
	const { isWalletConnect, lunaAddress } = useWalletConnect();
	const { mobileMenu } = useAppSelector(state => state.ModalSlice)
	const dispatch = useAppDispatch()

	const closeMobileMenu = () => {
		dispatch(setMobileMenu(false))
	}

	const disconnectWallet = () => {
		disconnect()
		Cookies.remove('token')
	}

	return (
		<MobileModal
			open={mobileMenu}
			onClose={closeMobileMenu}
			aria-labelledby="mobile-modal"
			aria-describedby="mobile-modal-menu"
		>
			<MenuWrapper style={{right: 0, top: '62px'}}>
				{
					isWalletConnect ? (
						<>
							<MenuButton>
								<IcPerson />
								<i>{isWalletConnect && lunaAddress}</i>
							</MenuButton>

							<MenuButton onClick={disconnectWallet}>
								<IcDisconnect />
								<i>Disconnect</i>
							</MenuButton>
						</>
					)
						:
						<MenuButton onClick={() => dispatch(setWalletModal(true))}>
							<IcWallet />
							<i>Connect Wallet</i>
						</MenuButton>
				}

				<MenuButton href={'/advertise'}>
					<IcAdvertise />
					<i>Advertise</i>
				</MenuButton>

				<MenuButton href={'/freeze'}>
					<IcFreeze />
					<i>Freeze</i>
				</MenuButton>

				<MenuButton href={'https://docs.kandisprotocol.com/'}>
					<IcDocs/>
					<i>Docs</i>
				</MenuButton>

				<MenuButton href={'mailto:info@kandisprotocol.com'}>
					<IcContactUs />
					<i>Contact Us</i>
				</MenuButton>
			</MenuWrapper>
		</MobileModal>
	);
};

export default MobileMenu;
