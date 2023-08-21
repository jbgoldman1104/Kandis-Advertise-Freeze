import { styled, ButtonBase } from '@mui/material';
import {ReactComponent as IcDisconnect } from '../../assets/icons/ic_disconnect_black.svg';
import { useWallet } from '@terra-money/wallet-provider';

const Disconnect = () => {
	const { disconnect } = useWallet()

	return (
		<StyledDisconnect onClick={disconnect}>
			<IcDisconnect	/>
		</StyledDisconnect>
	);
};

export default Disconnect;

const StyledDisconnect = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-flex',
		height: '55px',
		width: '55px',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#FAD64B',
		borderRadius: '10px',
		color: '#000'
	};
});