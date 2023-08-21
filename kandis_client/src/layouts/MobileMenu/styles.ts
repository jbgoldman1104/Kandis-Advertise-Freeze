import { styled, Button, Modal } from '@mui/material';

export const MobileModal = styled(Modal)(({ theme }) => {
	return {
		'.css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': {
			background: 'transparent'
		},
	};
});

export const MenuWrapper = styled('div')((theme)=> ({
	maxWidth: '390px',
	width: '100%',
	position: 'absolute'
}))

export const MenuButton = styled(Button)((theme)=> ({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'start',
	gap: '10px',
	width: '100%',
	fontFamily: "'Roboto', sans-serif",
	fontSize: '1rem',
	lineHeight: '1.5rem',
	fontWeight: 600,
	color: '#fff',
	background: '#000',
	padding: '14px 35px',
	textTransform: 'none',
	borderRadius: '0',
	borderBottom: '1px solid #fff',
	'&:last-child': {
		borderRadius: ' 0px 0px 10px 10px;'
	},
	'&:hover': {
		background: '#000'
	},
	'> i': {
		maxWidth: '200px',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	}
}))