import styles from './StartScreen.module.scss'
import { AdvertiseLink, FreezeLink } from './styles'
import { ReactComponent as IcArrow } from '../../../../assets/icons/ic_arrow.svg'
import KandisTransaction from '../../../../core/contract/KandisTransaction';

const StartScreen = () => {
	const kandisTransaction = new KandisTransaction('terra1fyeqs433fuqshkzknz0ry2xw0ra2vltau8daw6p5a6um3khgnnmqawa32k')

	const handleClick = async () => {
		await kandisTransaction.sendTransaction({auth: {"otp": "123456"}});
	}

	return (
		<section className={styles.startScreen}>
			<div className={styles.container}>
				<h1 className={styles.title}>
					Connect{' '}
					<i className={styles.rectGradient}>
						with <span></span>
					</i>
					<br />
					<i className={styles.rectBlackGradient}>
						the
						<span></span>
					</i>{' '}
					<i className={styles.colorYellow}>Community</i>
					<span className={styles.sqrGradient}></span>
				</h1>

				<div className={styles.text}>
					<p>
						Innovative web3 advertising platform allowing advertisers to connect
						with a concentrated niche of investors.
					</p>
				</div>
			</div>

			<div className={styles.linksGroup}>
				<AdvertiseLink href={'/advertise'}>
					Advertise{' '}
					<i className={'icon'}>
						<IcArrow />
					</i>
				</AdvertiseLink>
				<FreezeLink href={'/freeze'}>Freeze</FreezeLink>
			</div>
		</section>
	)
}

export default StartScreen
