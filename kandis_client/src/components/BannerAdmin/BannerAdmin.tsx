import { FC } from 'react';
import styles from './BannerAdmin.module.scss'
import Image from '../Image/Image';
import { ButtonBase, styled } from '@mui/material';
import { useAppDispatch } from '../../core/hooks/storeHooks';
import { setActive, setBannerId } from '../../core/redux/slices/AdminReviewSlice';
import { AdminReview } from '../../modules/AdminReview';

interface BannerAdminProps {
	imageURL: string
	bannerId: string
}

const BannerAdmin: FC<BannerAdminProps> = ({ bannerId, imageURL }) => {
	const dispatch = useAppDispatch()

	const reviewBanner = () => {
		dispatch(setActive(true))
		dispatch(setBannerId(bannerId))
	}

	return (
		<>
			<div data-banner-id={bannerId} className={styles.bannerAdmin}>
				<Image src={imageURL} fluid api />
				<StyledButton onClick={reviewBanner}>Edit</StyledButton>
			</div>
		</>
	);
};

export default BannerAdmin;


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