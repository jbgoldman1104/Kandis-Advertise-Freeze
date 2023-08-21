import styles from './Banner.module.scss'
import { FC } from 'react';
import Image from '../Image/Image';
import { ButtonBase, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../core/hooks/storeHooks';
import { setActive, setBannerId } from '../../core/redux/slices/BannerReviewSlice';
import { Link, useLocation } from 'react-router-dom';

interface BannerProps {
	imageURL: string
	bannerInd: string
}

const Banner: FC<BannerProps> = ({ bannerInd, imageURL }) => {
	const dispatch = useAppDispatch();
	const { bannerId } = useAppSelector(state => state.BannerReviewSlice)

	const openBannerReview = () => {
		if (bannerId === null) {
			dispatch(setActive(true))
			dispatch(setBannerId(bannerInd))
		}
	}

	return (
		<div data-banner-id={bannerInd} role={'button'} onClick={openBannerReview} className={styles.banner}>
				<Image src={imageURL} api />
		</div>
	);
};

export default Banner;

export const StyledButton = styled(ButtonBase)(({ theme }) => {
	return {
		display: 'inline-block',
		padding: '11px 23px',
		minWidth: '185px',
		background: 'rgba(0, 0, 0, 0.9);',
		backdropFilter: '50px',
		border: '1px solid #fff',
		borderRadius: '10px',
		fontFamily: "'Roboto', sans-serif",
		fontSize: '1.5rem',
		lineHeight: '1.5rem',
		fontWeight: 600,
		color: '#fff',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		'@media(max-width: 768px)': {
			fontSize: '1rem',
			lineHeight: '1.5rem'
		}
	}
})