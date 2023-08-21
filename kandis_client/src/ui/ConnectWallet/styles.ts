import { ButtonBase } from '@mui/material';
import { styled } from '@mui/material';

export const ConnectButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-flex',
		height: '55px',
		alignItems: 'center',
		gap: '8px',
		padding: '14px 45px',
		background: '#FAD64B',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.25rem',
		lineHeight: '1.6rem',
		fontWeight: 600,
		color: '#000',
		'@media(max-width: 768px)': {
			borderRadius: '5px',
			width: '100%',
			padding: '6px 13px',
			fontSize: '1rem',
			lineHeight: '1.5rem'
		}
	};
});
