import styles from './RoadMap.module.scss'
import Container from '../../../../containers/Container/Container'
import { useMediaQuery } from '@mui/material'
import RoadMapDesktop from './RoadMapDesktop'
import RoadMapMobile from './RoadMapMobile'

const RoadMap = () => {
	const isDesktop = useMediaQuery('(min-width:1024px)')

	return (
		<section className={styles.roadMap}>
			<Container>
				<h1 className={styles.title}>ROADMAP</h1>

				{isDesktop ? <RoadMapDesktop /> : <RoadMapMobile />}
			</Container>
		</section>
	)
}

export default RoadMap
