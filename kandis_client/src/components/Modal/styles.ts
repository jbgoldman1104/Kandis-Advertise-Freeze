import { Dialog, styled } from '@mui/material';

export const StyledModal = styled(Dialog)(({ theme }) => {
	return {
		'.MuiDialog-paper': {
			maxWidth: '630px',
			backgroundColor: '#000',
			color: '#fff',
			borderRadius: '10px'
		}
	}
})
