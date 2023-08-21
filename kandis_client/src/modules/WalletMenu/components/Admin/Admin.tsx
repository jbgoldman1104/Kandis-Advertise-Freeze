import { MenuButton } from '../../styles';
import { ReactComponent as IcAdmin } from '../../../../assets/icons/ic_admin_panel.svg';

const Admin = () => {
	return (
		<MenuButton href={'/admin'}>
			<IcAdmin />
			<i>Admin Panel</i>
		</MenuButton>
	);
};

export default Admin;