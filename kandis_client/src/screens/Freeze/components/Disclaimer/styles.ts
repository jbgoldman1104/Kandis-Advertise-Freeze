import { ButtonBase, styled } from '@mui/material';

export const AcceptButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-flex',
		alignItems: 'center',
		gap: '8px',
		padding: '10px 50px',
		background: '#FAD64B',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#000',
	};
});