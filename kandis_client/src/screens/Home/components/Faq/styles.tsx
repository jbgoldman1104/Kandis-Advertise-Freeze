import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { Box, styled } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

export const FaqAccordion = styled(Accordion)(({ theme }) => {
	return {
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '2rem',
		fontWeight: '400',
		color: '#fff',
		boxShadow: 'none', // this styles directly apply to accordion
		border: `1px solid rgba(255, 255, 255, 0.5)`,
		borderRadius: '5px',
		filter: 'drop-shadow(0px 0px 19px rgba(255, 255, 255, 0.1))',
		marginBottom: '30px',
		background:
			'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0645) 51.04%, rgba(255, 255, 255, 0) 94.79%);',
		'&:last-of-type': {
			borderBottomLeftRadius: '5px',
			borderBottomRightRadius: '5px',
			margin: 0
		},
		'&.Mui-expanded': {
			marginBottom: 30
		},
		'@media(max-width: 768px)': {
			fontSize: '1rem',
			lineHeight: '1.5rem',
			marginBottom: '15px',
			'&.Mui-expanded': {
				marginBottom: '15px'
			}
		}
	}
})

export const FaqAccordionSummary = styled(AccordionSummary)(({ theme }) => {
	return {
		margin: '5px 0',
		'MuiAccordionSummary-content': {
			margin: 0
		},
		paddingRight: '45px',
		'@media(max-width: 768px)': {
			margin: 0
		}
	}
})

export const FaqAccordionDetails = styled(AccordionDetails)(({ theme }) => {
	return {
		paddingTop: 20
	}
})

export const FaqAccordionIcon = () => {
	return (
		<Box
			sx={{
				'.Mui-expanded & > .expandIcon': {
					'&::after': {
						transform: 'rotate(0deg)'
					}
				},
				'.expandIcon': {
					position: 'absolute',
					top: '45%',
					transform: 'translateY(-45%)',
					right: '40px',

					'&::before': {
						content: '""',
						position: 'absolute',
						width: '20px',
						height: '2px',
						background: '#fff'
					},

					'&::after': {
						content: '""',
						flexShrink: 0,
						background: '#fff',
						position: 'absolute',
						width: '20px',
						height: '2px',
						transition: '0.3s',
						transform: 'rotate(90deg)'
					}
				}
			}}
		>
			<div className={'expandIcon'}></div>
		</Box>
	)
}

export const FaqTab = styled(Tab)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '20px 60px',
		borderRadius: '5px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '2rem',
		textTransform: 'none',
		color: '#8E8E8D;',
		background: 'rgba(255, 255, 255, 0.05)',
		border: 'none',
		'&.Mui-selected': {
			color: '#fff',
			border: '1px solid #fff',
			background:
				'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0645) 51.04%, rgba(255, 255, 255, 0) 94.79%)'
		},
		'@media(max-width: 768px)': {
			padding: '13px 35px',
			borderRadius: '10px',
			fontSize: '1rem',
			lineHeight: '1.5rem'
		}
	}
})

export const FaqTabList = styled(TabList)(({ theme }) => {
	return {
		marginBottom: '50px',
		'.MuiTabs-flexContainer': {
			justifyContent: 'center',
			flexWrap: 'wrap',
			gap: 20
		},
		'@media(max-width: 768px)': {
			marginBottom: '30px'
		}
	}
})

export const FaqTabPanel = styled(TabPanel)(({ theme }) => {
	return {
		padding: 0,
		maxWidth: '855px',
		margin: '0 auto'
	}
})
