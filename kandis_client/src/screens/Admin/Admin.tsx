import Page from '../../components/Page/Page';
import { Helmet } from 'react-helmet-async';
import Main from '../../containers/Main/Main';
import Banners from './components/Banners/Banners';

const Admin = () => {
	const helmet = <Helmet>
		<title>Admin Panel</title>
	</Helmet>

	return (
		<Page helmet={helmet}>
			<Main>
				<Banners />
			</Main>
		</Page>
	);
};

export default Admin;