import { ButtonBase, styled } from '@mui/material'

export const StyledAddButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '11px 23px',
		minWidth: '185px',
		border: '1px solid #fff',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#fff',
		'@media(max-width: 768px)': {
			fontSize: '1rem',
			lineHeight: '1.5rem'
		}
	}
})
