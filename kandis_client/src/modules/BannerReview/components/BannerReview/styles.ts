import { Button, Skeleton, styled } from '@mui/material';
import { Textarea, FormLabel} from '@mui/joy';

export const StyledTextArea = styled(Textarea)(({ theme }) => {
	return {
		width: '100%',
		height: '145px',
		padding: '14px',
		background: 'var(--light-black)',
		outline: 'none',
		borderRadius: '20px',
		resize: 'none',
		border: '1px solid var(--yellow)',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		color: '#fff',

		'&.Joy-focused::before': {
			boxShadow: 'none'
		},

		'&:hover:not(.Joy-focused)': {
			border: '1px solid var(--yellow)',
			color: '#fff'
		},

		'&.Joy-disabled': {
			color: '#fff',
			borderColor: 'var(--yellow)'
		}
	}
})


export const CustomSkeleton = styled(Skeleton)(({ theme }) => {
	return {
		background: 'rgba(255, 255, 255, 0.13)',
	}
})

export const StyledFormLabel = styled(FormLabel)(({ theme }) => {
	return {
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		color: '#fff',
		paddingLeft: '15px'
	}
})

export const Visit = styled(Button)(({ theme }) => {
	return {
		padding: '11px 23px',
		background: 'var(--yellow)',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		color: '#000',
		fontWeight: 600,
		textTransform: 'none',
		'&:hover': {
			background: 'var(--yellow)'
		}
	}
})

export const Close = styled(Button)(({ theme }) => {
	return {
		padding: '11px 45px',
		background: '#333333',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1rem',
		lineHeight: '1.5rem',
		color: '#fff',
		fontWeight: 600,
		textTransform: 'none',
		'&:hover': {
			background: '#333333'
		}
	}
})
