import styles from './Navbar.module.scss'
import { FC } from 'react';

interface PageTitleBoxProps {
	title: string
	href: string
}

const PageLink: FC<PageTitleBoxProps> = ({ title, href }) => {
	return (
		<a href={href} className={styles.pageLink}>
			{title}
		</a>
	);
};

export default PageLink;