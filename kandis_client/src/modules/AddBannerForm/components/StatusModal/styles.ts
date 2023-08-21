import { ButtonBase, styled } from '@mui/material';

export const CloseButton = styled(ButtonBase)(({ theme }) => {
	return {
		background: 'var(--yellow)',
		padding: '11px 59px',
		borderRadius: '8px',
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#000'
	}
})