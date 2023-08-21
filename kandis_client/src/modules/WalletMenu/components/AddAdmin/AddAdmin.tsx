import { MenuButton } from '../../styles';
import {ReactComponent as IcAddAdmin} from '../../../../assets/icons/ic_admin_list.svg';
import { useAppDispatch } from '../../../../core/hooks/storeHooks';
import { setAdminList } from '../../../../core/redux/slices/ModalSlice';

const AddAdmin = () => {
	const dispatch = useAppDispatch()

	const openAdminList = () => {
		dispatch(setAdminList(true))
	}

	return (
		<MenuButton onClick={openAdminList}>
			<IcAddAdmin />
			<i>Admin List</i>
		</MenuButton>
	);
};

export default AddAdmin;