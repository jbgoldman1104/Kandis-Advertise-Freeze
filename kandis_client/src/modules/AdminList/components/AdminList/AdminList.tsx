import styles from './AdminList.module.scss'
import Modal from '../../../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/storeHooks';
import { setAdminList } from '../../../../core/redux/slices/ModalSlice';
import AdminWallets from '../AdminWallets/AdminWallets';
import AddAdmin from '../AddAdmin/AddAdmin';

const AdminList = () => {
	const { adminList } = useAppSelector(state => state.ModalSlice)
	const dispatch = useAppDispatch()

	return (
		<Modal
			modalTitle={'Admin List'}
			open={adminList}
			onClose={() => dispatch(setAdminList(false))}
		>
			<div className={styles.container}>
				<AdminWallets />

				<AddAdmin />
			</div>
		</Modal>
	);
};

export default AdminList;