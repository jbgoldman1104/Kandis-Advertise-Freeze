import styles from './AdminWallets.module.scss'
import { useQuery } from '@tanstack/react-query';
import AdminListService from '../../api/AdminList.service';
import { IAdmin } from '../../types';
import AdminItem from './AdminItem';

const AdminWallets = () => {
	const { data, isLoading } = useQuery(['get admins'],
		() => AdminListService.getAll()
		)

	const renderedItems = data && data.map((admin: IAdmin, index) => {
		return <AdminItem
			key={admin._id}
			_id={admin._id}
			number={index}
			wallet={admin.wallet}
		/>
	})

	return (
		<ul className={styles.adminList}>
			{!isLoading && renderedItems}
		</ul>
	);
};

export default AdminWallets;