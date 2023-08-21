import styles from './Faq.module.scss'
import Container from '../../../../containers/Container/Container'
import React from 'react'
import {
	FaqAccordion,
	FaqAccordionDetails,
	FaqAccordionIcon,
	FaqAccordionSummary,
	FaqTabList,
	FaqTabPanel,
	FaqTab
} from './styles'
import TabContext from '@mui/lab/TabContext'
import { faqAdvertisersData, faqNftHoldersData } from './Faq.data'
import { Box } from '@mui/material'

const Faq = () => {
	const [value, setValue] = React.useState('1')

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	return (
		<section className={styles.faq}>
			<Container>
				<h1 className={styles.title}>FAQ</h1>

				<TabContext value={value}>
					<Box>
						<FaqTabList
							sx={{
								'.MuiTabs-indicator': {
									display: 'none'
								}
							}}
							onChange={handleChange}
						>
							<FaqTab label='Advertisers' value='1' />
							<FaqTab label='NFT Holders' value='2' />
						</FaqTabList>
					</Box>
					<FaqTabPanel value='1'>
						{faqAdvertisersData.map((item, index) => {
							return (
								<FaqAccordion key={index}>
									<FaqAccordionSummary>
										{item.question}
										<FaqAccordionIcon />
									</FaqAccordionSummary>
									<FaqAccordionDetails>{item.answer}</FaqAccordionDetails>
								</FaqAccordion>
							)
						})}
					</FaqTabPanel>
					<FaqTabPanel value='2'>
						{faqNftHoldersData.map((item, index) => {
							return (
								<FaqAccordion key={index}>
									<FaqAccordionSummary>
										{item.question}
										<FaqAccordionIcon />
									</FaqAccordionSummary>
									<FaqAccordionDetails>{item.answer}</FaqAccordionDetails>
								</FaqAccordion>
							)
						})}
					</FaqTabPanel>
				</TabContext>
			</Container>
		</section>
	)
}

export default Faq
