import styles from './RoadMap.module.scss'
import classNames from 'classnames'
import roadMapItem from '../../../../assets/images/roadMap/roadMapItem.png'
import qOneImage from '../../../../assets/images/roadMap/q1.png'
import qTwoImage from '../../../../assets/images/roadMap/q2.png'
import qThreeImage from '../../../../assets/images/roadMap/q3.png'
import qFourImage from '../../../../assets/images/roadMap/q4.png'

const RoadMapDesktop = () => {
	return (
		<div className={styles.roadMapContainer}>
			<div className={styles.roadMapRoot}>
				<div className={classNames(styles.roadMapItem, styles.dec_20)}>
					<div className={styles.content}>
						<img src={roadMapItem} alt='rouadMapItem' />
						<h3>DEC 2022</h3>
					</div>
					<h4>NFT COLLECTION LAUNCH</h4>
				</div>

				<div className={classNames(styles.roadMapYear, styles.yellow)}>
					2023
				</div>

				<div className={classNames(styles.roadMapYear, styles.gray)}>2024</div>
			</div>

			<div className={classNames(styles.roadMapItem, styles.q_1)}>
				<div className={styles.content}>
					<img src={qOneImage} alt='rouadMapItem' />
					<h3>2023 Q1</h3>
				</div>
				<ul>
					<li>Market research & competitive analysis</li>
					<li>Website setup & smart contract testing</li>
					<li>Design affiliated marketing structure</li>
				</ul>
			</div>

			<div className={classNames(styles.roadMapItem, styles.q_2)}>
				<div className={styles.content}>
					<img src={qTwoImage} alt='rouadMapItem' />
					<h3>2023 Q2</h3>
				</div>
				<ul>
					<li>Launch smart contracts on terra luna classic</li>
					<li>Deploy validator node "Kandis Protocol"</li>
					<li>Create additional validator treasury</li>
				</ul>
			</div>

			<div className={classNames(styles.roadMapItem, styles.q_3, styles.gray)}>
				<div className={styles.content}>
					<img src={qThreeImage} alt='rouadMapItem' />
					<h3>2023 Q3</h3>
				</div>
				<ul>
					<li>Add calendar feature</li>
					<li>Launch smart contract on terra luna 2.0</li>
					<li>Create DAO and airdrop tokens to NFT holders</li>
				</ul>
			</div>

			<div className={classNames(styles.roadMapItem, styles.gray, styles.q_4)}>
				<div className={styles.content}>
					<img src={qFourImage} alt='rouadMapItem' />
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

export default RoadMapDesktop
