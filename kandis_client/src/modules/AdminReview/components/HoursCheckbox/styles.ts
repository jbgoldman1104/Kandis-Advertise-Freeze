import { Checkbox, FormControlLabel, styled } from '@mui/material';

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => {
	return {
		'.MuiFormControlLabel-label': {
			'> p': {
				fontFamily: "'Roboto', sans-serif",
				fontSize: '1.125rem',
				lineHeight: '1.6rem',
				fontWeight: 500,
				color: '#fff;',
				marginTop: '5px',

				'&.Mui-disabled': {
					color: '#fff'
				},

				'> span': {
					color: 'var(--yellow)'
				}
			}
		},
		'.css-catnby-MuiFormControlLabel-root': {
			marginLeft: '-8px'
		},
	}
})

export const StyledCheckbox = styled(Checkbox)(({ theme }) => {
	return {
		color: 'var(--yellow)'
	}
})