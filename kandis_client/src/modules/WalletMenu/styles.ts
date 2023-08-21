import { Button, styled } from '@mui/material';

export const MenuList = styled('ul')(({ theme }) => {
	return {
		width: '235px',
		minHeight: '49px',
		border: '1px solid #fff',
		borderRadius: '10px',
		background: '#121212',
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		right: '27px',
		zIndex: 100
	}
})

export const MenuItem = styled('li')(({ theme }) => {
	return {
		width: '100%',
		background: 'transparent',
		borderBottom: '1px solid #fff',
		'&:last-child': {
			border: 'none',
		},
		'&.abs': {
			position: 'absolute'
		}
	}
})

export const MenuButton = styled(Button)(({ theme }) => {
	return {
		fontFamily: '\'Roboto\', sans-serif',
		fontSize: '1.25rem',
		lineHeight: '1.625rem',
		textTransform: 'none',
		color: '#fff',
		position: 'relative',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'start',
		gap: '5px',
		width: '100%',
		padding: '10px 15px',
		background: 'transparent',
		'&:hover': {
			background: 'transparent'
		},
		'> i': {
			maxWidth: '135px',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			whiteSpace: 'nowrap'
		},
		'> .arrow': {
			position: 'absolute',
			top: '50%',
			right: '20px',
			transform: 'translateY(-50%) rotate(0deg)',
			transition: '0.4s',
			'&.active': {
				top: '15%',
				transform: 'rotate(180deg) translateY(-15%)'
			}
		}
	}
})