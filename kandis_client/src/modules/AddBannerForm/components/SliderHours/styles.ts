import { Slider, styled } from '@mui/material';

export const CustomSlider = styled(Slider)(({ theme }) => {
	return {
		'&.MuiSlider-root': {
			height: '5px',
		},
		'.MuiSlider-markLabel': {
			color: '#fff'
		},
		'.MuiSlider-mark': {
			display: 'none'
		},
		'.MuiSlider-thumb': {
			color: 'var(--yellow)',
			'&.Mui-active': {
				boxShadow: '0px 0px 0px 14px rgba(250, 214, 75, 0.1)'
			},
		},
		'.MuiSlider-rail': {
			color: 'rgba(255, 255, 255, 0.2)',
			opacity: 1
		},
		'.MuiSlider-track': {
			display: 'none'
		},
		'.MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
			boxShadow: '0px 0px 0px 8px rgba(250, 214, 75, 0.1)'
		},

	}
})