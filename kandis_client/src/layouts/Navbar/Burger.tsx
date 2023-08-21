import styles from './Navbar.module.scss';
import { ReactComponent as IcBurger } from '../../assets/icons/ic_burger.svg';
import { useAppDispatch } from '../../core/hooks/storeHooks';
import { setMobileMenu } from '../../core/redux/slices/ModalSlice';

const Burger = () => {
	const dispatch = useAppDispatch();

	const openMobileMenu = () => {
		dispatch(setMobileMenu(true));
	};

	return (
		<div
			onClick={openMobileMenu}
			className={styles.burger}
			role={'button'}
			tabIndex={0}
		>
			<IcBurger />
		</div>
	);
};

export default Burger;
