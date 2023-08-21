import styles from './ScrollNftBox.module.scss'
import { FC } from 'react'

interface ScrollNftBoxProps {
	images: string[]
}

const ScrollNftBox: FC<ScrollNftBoxProps> = ({ images }) => {
	return (
		<div className={styles.nftScrollBox}>
			{images.map((item, index) => {
				return (
					<div key={index} className={styles.nftItem}>
						<img src={item} alt='nftItem' />
					</div>
				)
			})}
		</div>
	)
}

export default ScrollNftBox
