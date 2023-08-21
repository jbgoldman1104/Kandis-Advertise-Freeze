import { Box, ButtonBase, styled } from '@mui/material';
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'

export const NftTabPanel = styled(TabPanel)(({ theme }) => {
	return {
		padding: 0
	}
})

export const NftTab = styled(Tab)(({ theme }) => {
	return {
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.25rem',
		lineHeight: '1.6rem',
		fontWeight: 600,
		color: '#fff',
		textTransform: 'none',
		'&.Mui-selected': {
			color: '#fff'
		},
		'&.MuiTabs-indicator': {
			backgroundColor: '#fff'
		},
		'@media(max-width: 768px)': {
			fontSize: '1rem',
			lineHeight: '1.5rem',
			padding: '10px'
		}
	}
})

export const FlexWrapper = styled(Box)(({ theme }) => {
	return {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})