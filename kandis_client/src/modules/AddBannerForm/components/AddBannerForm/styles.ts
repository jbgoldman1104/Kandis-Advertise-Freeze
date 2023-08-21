import { styled, Dialog, ButtonBase } from '@mui/material';

export const FormDialog = styled(Dialog)(({ theme }) => {
	return {
		'.MuiDialog-paper': {
			maxWidth: '630px',
			backgroundColor: '#000',
			color: '#fff'
		}
	}
})

export const Cancel = styled(ButtonBase)(({ theme }) => {
	return {
		padding: '11px 46px',
		background: '#333333',
		borderRadius: '8px',
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#fff'
	}
})

export const Add = styled(ButtonBase)(({ theme }) => {
	return {
		padding: '11px 23px',
		background: 'var(--yellow)',
		borderRadius: '8px',
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#000'
	}
})

export const ButtonsGroup = styled('div')(({ theme }) => {
	return {
		display: 'flex',
		gap: '20px',
		marginTop: '70px',
		justifyContent: 'end'
	}
})
