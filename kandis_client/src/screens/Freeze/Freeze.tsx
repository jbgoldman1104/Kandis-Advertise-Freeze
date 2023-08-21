import Page from '../../components/Page/Page'
import Main from '../../containers/Main/Main'
import Container from '../../containers/Container/Container'
import styles from './Freeze.module.scss'
import FreezeTable from './components/FreezeTable/FreezeTable'
import NftBox from './components/NftBox/NftBox'
import { Helmet } from 'react-helmet-async'
import Tip from './components/Tip/Tip';
import Disclaimer from './components/Disclaimer/Disclaimer';

const Freeze = () => {
	const helmet = (
		<Helmet>
			<title>Kandis Protocol - Freeze</title>
			<meta property="og:title" content="Kandis Protocol - Freeze" />
		</Helmet>
	)

	return (
		<Page helmet={helmet}>
			<Main>
				<section className={styles.freeze}>
					<Container>
						<h1 className={styles.title}>Tori Tori No mi Freeze</h1>

						<FreezeTable />
						<Tip />
						<NftBox />
					</Container>
				</section>
			</Main>

			<Disclaimer />
		</Page>
	)
}

export default Freeze
