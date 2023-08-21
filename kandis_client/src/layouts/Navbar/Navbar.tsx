import styles from './Navbar.module.scss';
import Container from '../../containers/Container/Container';
import Logo from '../../ui/Logo/Logo';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Burger from './Burger';
import { useWalletConnect } from '../../core/hooks/useWalletConnect';
import { WalletMenu } from '../../modules/WalletMenu';
import ConnectWallet from '../../ui/ConnectWallet/ConnectWallet';
import PageLink from './PageLink';

const Navbar = () => {
	const { isWalletConnect } = useWalletConnect();
	const location = useLocation();
	const isDesktop = useMediaQuery('(min-width: 768px)');


	return (
		<header className={styles.navbar}>
			<Container className={styles.navbarRow}>
				<Logo />


				{isWalletConnect && isDesktop && location.pathname !== '/' && <WalletMenu />}
				{!isWalletConnect && isDesktop && location.pathname !== '/' && <ConnectWallet />}
				{location.pathname === '/freeze' && <PageLink title={'Billboards'} href={'/advertise'} />}
				{location.pathname === '/advertise' && <PageLink title={'Freeze'} href={'/freeze'} />}

				{!isDesktop && location.pathname !== '/' && <Burger />}
			</Container>
		</header>
	);
};

export default Navbar;