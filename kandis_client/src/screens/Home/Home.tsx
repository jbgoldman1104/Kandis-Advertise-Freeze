import Main from '../../containers/Main/Main'
import Page from '../../components/Page/Page'
import StartScreen from './components/StartScreen/StartScreen'
import About from './components/About/About'
import RoadMap from './components/RoadMap/RoadMap'
import Faq from './components/Faq/Faq'
import Footer from '../../layouts/Footer/Footer'
import { Helmet } from 'react-helmet-async'
import { AddBannerForm } from '../../modules/AddBannerForm';

const Home = () => {

	const helmet = (
		<Helmet>
			<title>Kandis Protocol - Home</title>
			<meta property="og:title" content="Kandis Protocol - Home" />
		</Helmet>
	)

	return (
		<Page helmet={helmet}>
			<Main>
				<StartScreen />
				<About />
				<RoadMap />
				<Faq />
			</Main>
			<Footer />
			<AddBannerForm />
		</Page>
	)
}

export default Home
