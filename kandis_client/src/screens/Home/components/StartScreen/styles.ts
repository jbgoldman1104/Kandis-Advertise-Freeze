import { Button, styled } from '@mui/material'

export const AdvertiseLink = styled(Button)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '20px 50px',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '2rem',
		fontWeight: 400,
		textDecoration: 'none',
		color: '#000',
		textTransform: 'none',
		background: 'var(--yellow)',
		'&:hover': {
			background: 'var(--yellow)'
		},
		'> .icon ': {
			marginLeft: '10px;'
		},
		'@media(max-width: 768px)': {
			padding: '14px 40px',
			fontSize: '1rem',
			lineHeight: '1.5rem',
			fontWeight: 600
		}
	}
})

export const FreezeLink = styled(Button)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '20px 50px',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '2rem',
		fontWeight: 400,
		textDecoration: 'none',
		color: '#fff',
		border: '1px solid #fff',
		textTransform: 'none',
		background: 'transparent',
		'&:hover': {
			background: '#fff',
			color: '#000'
		},
		'@media(max-width: 768px)': {
			padding: '14px 40px',
			fontSize: '1rem',
			lineHeight: '1.5rem',
			fontWeight: 600
		}
	}
})
