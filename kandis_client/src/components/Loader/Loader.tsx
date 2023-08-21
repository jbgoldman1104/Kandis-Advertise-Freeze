import styles from './Loader.module.scss'
import { CircularProgress, styled } from '@mui/material';

const Loader = () => {
	return (
		<div role="alert" className={styles.loader}>
			<div className={styles.progress}>
				<CustomLoader />
			</div>
		</div>
	);
};

export default Loader;

export const CustomLoader = styled(CircularProgress)(({ theme }) => {
	return {
		color: 'var(--yellow)'
	}
})