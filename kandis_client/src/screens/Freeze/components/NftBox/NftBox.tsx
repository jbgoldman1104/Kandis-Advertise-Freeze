import React from 'react'
import styles from './NftBox.module.scss'
import { nftBoxData } from './NftBox.data'
import ScrollNftBox from '../../../../components/ScrollNftBox/ScrollNftBox'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { NftTab, NftTabPanel } from './styles'
import AdvertiseRadio from '../../../../ui/AdvertiseRadio/AdvertiseRadio';
import Checkboxes from './Checkboxes';

const NftBox = () => {
	const [value, setValue] = React.useState('1');

	const options = [
		{
			value: 'Gold',
			label: 'gold'
		},
		{
			value: 'Silver',
			label: 'silver'
		},
		{
			value: 'Bronze',
			label: 'bronze'
		},
	]

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	return (
		<div className={styles.nftBox}>
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: '#3A3A3A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<TabList
							sx={{
								'.MuiTabs-indicator': {
									backgroundColor: '#fff'
								}
							}}
							onChange={handleChange}
						>
							<NftTab label='All' value='1' />
							<NftTab label='Frozen' value='2' />
							<NftTab label='Unfrozen' value='3' />
						</TabList>
						<Checkboxes />
					</Box>
					<NftTabPanel value='1'>
						<ScrollNftBox images={nftBoxData} />
					</NftTabPanel>
					<NftTabPanel value='2'>
						<ScrollNftBox images={nftBoxData} />
					</NftTabPanel>
					<NftTabPanel value='3'>
						<ScrollNftBox images={nftBoxData} />
					</NftTabPanel>
				</TabContext>
			</Box>
		</div>
	)
}

export default NftBox
