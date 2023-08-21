import { ButtonBase, styled } from '@mui/material'

export const WalletButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-flex',
		gap: '25px',
		alignItems: 'center',
		justifyContent: 'start',
		padding: '10px 20px',
		width: '100%',
		background: '#0C0C0C;',
		borderRadius: '20px',
		border: '1px solid var(--yellow)',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '2rem',
		fontWeight: 600,
		color: '#fff',

		'> img': {
			width: 40,
			height: 40
		},

		'@media(max-width: 768px)': {
			borderRadius: '10px',
			fontSize: '1rem',
			lineHeight: '1.5rem',

			'> img': {
				width: '30px',
				height: '30px'
			}
		}
	}
})
