import Page from '../../components/Page/Page'
import Main from '../../containers/Main/Main'
import Banners from './components/Banners/Banners'
import { Helmet } from 'react-helmet-async'

const Advertise = () => {
	const helmet = (
		<Helmet>
			<title>Kandis Protocol - Advertise</title>
			<meta property="og:title" content="Kandis Protocol - Advertise" />
		</Helmet>
	)

	return (
		<Page helmet={helmet}>
			<Main>
				<Banners />
			</Main>
		</Page>
	)
}

export default Advertise
