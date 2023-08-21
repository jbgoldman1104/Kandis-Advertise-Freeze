import styles from './RoadMap.module.scss'
import classNames from 'classnames'
import roadMapItem from '../../../../assets/images/roadMap/roadMapItem.png'
import roadMapGrayItem from '../../../../assets/images/roadMap/roadMapGrayItem.png'

const RoadMapMobile = () => {
	return (
		<div className={styles.roadMapContainer}>
			<div className={classNames(styles.roadMapMobileItem, styles.dec_20)}>
				<div className={styles.content}>
					<img src={roadMapItem} alt='rouadMapItem' />
					<h3>DEC 2022</h3>
				</div>
				<h4>NFT COLLECTION LAUNCH</h4>
			</div>

			<div className={classNames(styles.roadMapMobileYear, styles.yellow)}>
				2023
			</div>

			<div className={classNames(styles.roadMapMobileItem, styles.q_1)}>
				<div className={styles.content}>
					<img src={roadMapItem} alt='rouadMapItem' />
					<h3>2023 Q1</h3>
				</div>
				<ul>
					<li>Market research & competitive analysis</li>
					<li>Website setup & smart contract testing</li>
					<li>Design affiliated marketing structure</li>
				</ul>
			</div>

			<div className={classNames(styles.roadMapMobileItem, styles.q_2)}>
				<div className={styles.content}>
					<img src={roadMapItem} alt='rouadMapItem' />
					<h3>2023 Q2</h3>
				</div>
				<ul>
					<li>Launch smart contracts on terra luna classic</li>
					<li>Deploy validator node "Kandis Protocol"</li>
					<li>Create additional validator treasury</li>
				</ul>
			</div>

			<div className={classNames(styles.roadMapMobileItem, styles.q_3, styles.gray)}>
				<div className={styles.content}>
					<img src={roadMapGrayItem} alt='rouadMapItem' />
					<h3>2023 Q3</h3>
				</div>
				<ul>
					<li>Add calendar feature</li>
					<li>Launch smart contract on terra luna 2.0</li>
					<li>Create DAO and airdrop tokens to NFT holders</li>
				</ul>
			</div>

			<div
				className={classNames(
					styles.roadMapMobileItem,
					styles.gray,
					styles.q_4
				)}
			>
				<div className={styles.content}>
					<img src={roadMapGrayItem} alt='rouadMapItem' />
					<h3>2023 Q4</h3>
				</div>
				<ul>
					<li>Add dashboard feature</li>
					<li>Subscription based advertising</li>
					<li>End of year report & roadmap review with DAO</li>
				</ul>
			</div>
		</div>
	)
}

export default RoadMapMobile
