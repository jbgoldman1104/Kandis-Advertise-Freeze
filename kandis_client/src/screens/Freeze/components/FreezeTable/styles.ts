import { ButtonBase, styled, TableCell, TableRow } from '@mui/material'

export const FreezeTableRow = styled(TableRow)(({ theme }) => {
	return {
		background: 'rgba(255, 255, 255, 0.07)',
		borderRadius: '5px',
		borderBottom: '18px solid #000',
		'@media(max-width: 576px)': {
			borderBottom: '14px solid #000'
		}
	}
})

export const FreezeTableCellThead = styled(TableCell)(({ theme }) => {
	return {
		fontFamily: "'Roboto', sans-serif",
		color: '#fff',
		fontSize: '1.25rem',
		lineHeight: '1.625rem',
		fontWeight: 400,
		padding: 21,
		'@media(max-width: 992px)': {
			fontSize: '1rem',
			lineHeight: '1.5rem',
			padding: '10px'
		},
		'@media(max-width: 576px)': {
			fontSize: '0.75rem',
			lineHeight: '0.975rem'
		}
	}
})

export const FreezeTableCell = styled(TableCell)(({ theme }) => {
	return {
		fontFamily: "'Roboto', sans-serif",
		color: '#fff',
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 400,
		padding: 21,
		'@media(max-width: 992px)': {
			padding: '5px 9px'
		},
		'@media(max-width: 576px)': {
			fontSize: '0.75rem',
			lineHeight: '0.975rem'
		}
	}
})

export const HarvestButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '8px 24px',
		background: '#FAD64B',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#000',
		'@media(max-width: 992px)': {
			padding: '5px 7px'
		},
		'@media(max-width: 576px)': {
			fontSize: '0.75rem',
			lineHeight: '0.975rem',
			borderRadius: '5px'
		}
	}
})

export const FreezeButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '8px 24px',
		border: '1px solid #FAD64B',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#FAD64B',

		'&:hover': {
			background: '#FAD64B',
			color: '#000'
		},
		'@media(max-width: 992px)': {
			padding: '5px 7px'
		},
		'@media(max-width: 576px)': {
			fontSize: '0.75rem',
			lineHeight: '0.975rem',
			borderRadius: '5px'
		}
	}
})
