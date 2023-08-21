import styles from './FreezeTable.module.scss'
import { Table, TableBody, TableHead } from '@mui/material'
import { ReactComponent as IcNft } from '../../../../assets/icons/ic_nft.svg'
import { ReactComponent as IcBronze } from '../../../../assets/icons/ic_bronze.svg'
import { ReactComponent as IcSilver } from '../../../../assets/icons/ic_silver.svg'
import { ReactComponent as IcGold } from '../../../../assets/icons/ic_gold.svg'
import {
	FreezeButton,
	FreezeTableCell,
	FreezeTableCellThead,
	FreezeTableRow,
	HarvestButton
} from './styles'
import { ReactNode } from 'react'

function createData(
	type: { icon: ReactNode; title: string },
	frozenNFT: string,
	dailyPot: number,
	harvestable: number
) {
	return { type, frozenNFT, dailyPot, harvestable }
}

const rows = [
	createData({ icon: <IcBronze />, title: 'Bronze' }, '1/400', 700, 700),
	createData({ icon: <IcSilver />, title: 'Silver' }, '1/75', 700, 700),
	createData({ icon: <IcGold />, title: 'Gold' }, '1/25', 700, 700)
]

const FreezeTable = () => {
	return (
		<Table>
			<TableHead>
				<FreezeTableRow>
					<FreezeTableCellThead>Type</FreezeTableCellThead>
					<FreezeTableCellThead>NFTs</FreezeTableCellThead>
					<FreezeTableCellThead>Daily Pot</FreezeTableCellThead>
					<FreezeTableCellThead>Harvestable</FreezeTableCellThead>
					<FreezeTableCellThead align={'center'}>Actions</FreezeTableCellThead>
				</FreezeTableRow>
			</TableHead>
			<TableBody>
				{rows.map((row, index) => {
					return (
						<FreezeTableRow key={index}>
							<FreezeTableCell>
								<div className={styles.type}>
									{row.type.icon}
									<span>{row.type.title}</span>
								</div>
							</FreezeTableCell>
							<FreezeTableCell>{row.frozenNFT}</FreezeTableCell>
							<FreezeTableCell>
								<div className={styles.group}>
									<i>
										<IcNft />
									</i>
									<span>{row.dailyPot}</span>
								</div>
							</FreezeTableCell>
							<FreezeTableCell>
								<div className={styles.group}>
									<i>
										<IcNft />
									</i>
									<span>{row.harvestable}</span>
								</div>
							</FreezeTableCell>
							<FreezeTableCell>
								<div className={styles.buttonsGroup}>
									<HarvestButton>Harvest</HarvestButton>
								</div>
							</FreezeTableCell>
						</FreezeTableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}

export default FreezeTable
