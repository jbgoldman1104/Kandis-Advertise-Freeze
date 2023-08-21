import styles from './Footer.module.scss';
import Container from '../../containers/Container/Container';
import classNames from 'classnames';

import { useMediaQuery } from '@mui/material';
import SocialIcons from '../../ui/SocialIcons/SocialIcons';

const Footer = () => {
	const isDesktop = useMediaQuery('(min-width:768px)');

	return (
		<footer className={styles.footer}>
			<Container className={styles.footerRow}>
				<div className={classNames(styles.footerCol)}>
					<div className={styles.footerRightsReserved}>
						©2023 Kandis Protocol. All Rights Reserved.
					</div>
				</div>
				<div className={classNames(styles.footerCol)}>
					<SocialIcons />
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
