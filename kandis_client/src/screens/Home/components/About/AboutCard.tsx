import { FC, ReactNode } from 'react'
import styles from './About.module.scss'

interface AboutCardProps {
	image: string
	title: string
	subtitle: string
}

const AboutCard: FC<AboutCardProps> = ({ image, title, subtitle }) => {
	return (
		<div className={styles.aboutCard}>
			<div className={styles.img}>
				{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
				<img src={image} alt={`${title} image`} />
			</div>
			<div className={styles.text}>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</div>
		</div>
	)
}

export default AboutCard
