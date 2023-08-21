import styles from './BannerReview.module.scss';
import Modal from '../../../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/storeHooks';
import Image from '../../../../components/Image/Image';
import FormControl from '@mui/joy/FormControl';
import { Close, StyledFormLabel, StyledTextArea, Visit, CustomSkeleton } from './styles';
import TimeBox from '../TimeBox/TimeBox';
import { Box, Grid } from '@mui/material';
import { setActive, setBannerId } from '../../../../core/redux/slices/BannerReviewSlice';
import { useQuery } from '@tanstack/react-query';
import BannerReviewService from '../../api/BannerReview.service';


const BannerReview = () => {
	const { isActive, bannerId } = useAppSelector(state => state.BannerReviewSlice);
	const dispatch = useAppDispatch();
	const { data, isLoading } = useQuery(['get review banner', bannerId],
		// @ts-ignore
		() => BannerReviewService.getOne(bannerId),
		{
			enabled: !!bannerId,
			refetchInterval: 30000
		}
	);


	const closeBannerReview = () => {
		dispatch(setActive(false));
		setTimeout(() => dispatch(setBannerId(null)), 150)
	};

	return (
		<Modal modalTitle={'Project information'} open={isActive} onClose={closeBannerReview}>
			<div className={styles.container}>
				<div className={styles.image}>
					{
						!data || isLoading
							? <CustomSkeleton variant='rectangular' sx={{ width: '100%', height: '100%' }} />
							: <Image fluid src={data.banner.imageURL} api />
					}
				</div>


				{
					!data || isLoading
						?
						<>
							<CustomSkeleton variant={'rounded'} height={20} width={80} sx={{ marginBottom: '8px' }} />
							<CustomSkeleton variant={'rounded'} height={140} sx={{ marginBottom: '20px' }} />
						</>
						:
						<FormControl sx={{ marginBottom: '20px' }}>
							<StyledFormLabel>Description</StyledFormLabel>
							<StyledTextArea disabled
															value={data.banner.description}
							/>
						</FormControl>
				}

				<Grid container alignItems={'end'}>
					<Grid item xs={4}>
						{
							!data || isLoading
								?
								<>
									<CustomSkeleton variant={'rounded'} height={15} width={80} sx={{ marginBottom: '8px' }} />
									<CustomSkeleton variant={'rounded'} height={25} width={80} />
								</>
								:
								<TimeBox
									hours={data.timeToDelete.leftHours}
									minutes={data.timeToDelete.leftMinutes}
									seconds={data.timeToDelete.leftSeconds}
								/>
						}
					</Grid>
					<Grid item xs={8}>
						<Box sx={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
							{
								!data || isLoading
									?
									<>
										<CustomSkeleton variant={'rounded'} height={45} width={130} />
										<CustomSkeleton variant={'rounded'} height={45} width={130} />
									</>
									:
									<>
										<Close onClick={closeBannerReview}>Close</Close>
										<Visit href={data.banner.websiteLink} formTarget={'_blank'}>Visit Website</Visit>
									</>
							}
						</Box>
					</Grid>
				</Grid>
			</div>
		</Modal>
	);
};

export default BannerReview;