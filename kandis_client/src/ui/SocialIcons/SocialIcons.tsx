import styles from './SocialIcons.module.scss';
import { useMediaQuery } from '@mui/material';
import { HandySvg } from 'handy-svg';
import { socialIconsData } from '../../core/data/socialIcons.data';

const SocialIcons = () => {
	const isDesktop = useMediaQuery('(min-width:768px)');

	return (
		<ul className={styles.socialIcons}>
			{
				socialIconsData.map((item, index) => {
					return <li key={index}>
						<a target={'_blank'} href={item.link} rel="noreferrer">
							<HandySvg src={item.icon}
												height={isDesktop ? 55 : 45}
												width={isDesktop ? 55 : 45}
							/>
						</a>
					</li>
				})
			}
		</ul>
	);
};

export default SocialIcons;
