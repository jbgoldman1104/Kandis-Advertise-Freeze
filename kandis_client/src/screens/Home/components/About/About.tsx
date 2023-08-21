import styles from './About.module.scss'
import Container from '../../../../containers/Container/Container'
import mission from '../../../../assets/images/about/mission.png'
import vision from '../../../../assets/images/about/vission.png'
import AboutCard from './AboutCard'

const About = () => {
	return (
		<section className={styles.about}>
			<Container>
				<div className={styles.aboutCards}>
					<AboutCard
						image={mission}
						title={'Mission'}
						subtitle={
							'Provide innovative web3 advertising solutions and extensive experience in marketing and promotion to help our advertisers reach their goals and maximise their return on investment.'
						}
					/>

					<AboutCard
						image={vision}
						title={'Vision'}
						subtitle={
							' Become the leading web3 marketing company that offers unique utility to our NFT holders with innovative blockchain solutions and improve the marketing capabilities of our advertisers.'
						}
					/>
				</div>
			</Container>
		</section>
	)
}

export default About
