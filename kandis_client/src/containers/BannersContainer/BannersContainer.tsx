import styles from './BannersContainer.module.scss'
import { FC, ReactNode } from 'react';

interface BannersContainerProps {
	children?: ReactNode
}

const BannersContainer: FC<BannersContainerProps> = ({ children }) => {
	return (
		<div className={styles.container}>{children}</div>
	);
};

export default BannersContainer;