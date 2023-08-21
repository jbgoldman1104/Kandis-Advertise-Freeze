import { ReactComponent as IcDisconnect } from '../../../../assets/icons/ic_disconnect_menu.svg';
import { MenuButton } from '../../styles';
import { useWallet } from '@terra-money/wallet-provider';
import Cookies from "js-cookie";

const Disconnect = () => {
	const { disconnect } = useWallet()

	const disconnectWallet = () => {
		disconnect()
		Cookies.remove('token')
	}

	return (
		<MenuButton onClick={disconnectWallet}>
			<IcDisconnect />
			<i>Disconnect</i>
		</MenuButton>
	);
};

export default Disconnect;