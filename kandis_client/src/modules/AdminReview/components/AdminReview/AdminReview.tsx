import styles from './AdminReview.module.scss';
import Modal from '../../../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/storeHooks';
import { StyledTextArea, StyledFormLabel, StyledInput, Accept, Decline, CustomSkeleton } from './styles';
import FormControl from '@mui/joy/FormControl';
import { Box, Grid } from '@mui/material';
import YellowCheckbox from '../../../../ui/YellowCheckbox/YellowCheckbox';
import HoursCheckbox from '../HoursCheckbox/HourseCheckbox';
import { useForm } from 'react-hook-form';
import { FC, useState } from 'react';
import Image from '../../../../components/Image/Image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminReviewService from '../../api/AdminReview.service';
import { setActive, setBannerId } from '../../../../core/redux/slices/AdminReviewSlice';
import { IBannerPost, IBannerPut } from '../../types';

const AdminReview = () => {
	const queryClient = useQueryClient();
	const [typeRequest, setTypeRequest] = useState<'decline' | 'accept'>('decline');
	const { isActive, bannerId } = useAppSelector(state => state.AdminReviewSlice);
	const dispatch = useAppDispatch();
	const { register, handleSubmit, reset } = useForm<IBannerPost>();
	const { data, isLoading } = useQuery<IBannerPost>(['get banner', bannerId],
		// @ts-ignore
		() => AdminReviewService.getOne(bannerId),
		{
			enabled: !!bannerId
		},
	);
	const deleteMutation = useMutation(['delete banner'],
		(bannerId: string) => AdminReviewService.deleteOne(bannerId),
		{
			onSuccess: async () => {
				dispatch(setActive(false));
				dispatch(setBannerId(null));
				await queryClient.invalidateQueries({ queryKey: ['get banners'] });
				reset();
			}
		}
	);
	const updateMutation = useMutation(['update banner'],
		(data: IBannerPut) => AdminReviewService.updateBanner(data),
		{
			onSuccess: async () => {
				dispatch(setActive(false));
				dispatch(setBannerId(null));
				await queryClient.invalidateQueries({ queryKey: ['get banners'] });
			}
		}
	);

	const handleAccept = async (data: any) => {
		if (typeRequest === 'decline') {
			await deleteMutation.mutateAsync(bannerId ? bannerId : '');
		} else if (typeRequest === 'accept') {
			const dataPut = {
				...data,
				bannerId: bannerId ? bannerId : ''
			}

			await updateMutation.mutateAsync(dataPut)
		}
	};

	const closeReview = () => {
		dispatch(setBannerId(null));
		dispatch(setActive(false));
		reset();

	};

	return (
		<>
			<Modal
				modalTitle={'Project information'}
				open={isActive}
				onClose={closeReview}
			>
				<div className={styles.container}>
					<div className={styles.image}>
						{
							isLoading || !data
								? <CustomSkeleton variant='rectangular' sx={{ width: '100%', height: '100%' }} />
								: <Image fluid src={data.imageURL} api />
						}
					</div>

					<form onSubmit={handleSubmit(handleAccept)}>
						{
							isLoading || !data
								?
								<FormControl sx={{ marginBottom: '25px' }}>
									<CustomSkeleton variant={'rounded'} height={100} />
								</FormControl>
								:
								<FormControl sx={{ marginBottom: '25px' }}>
									<StyledFormLabel>Description</StyledFormLabel>
									<StyledTextArea defaultValue={data.description} {...register('description', {
										shouldUnregister: true,
									})} />
								</FormControl>
						}

						<Grid container spacing={3} sx={{ marginBottom: '35px' }}>
							{
								isLoading || !data
									?
									<Grid item xs={6}>
										<CustomSkeleton variant={'rounded'} height={40} />
									</Grid>
									:
									<Grid item xs={6}>
										<FormControl>
											<StyledFormLabel>Website</StyledFormLabel>
											<StyledInput defaultValue={data.websiteLink} {...register('websiteLink')} />
										</FormControl>
									</Grid>
							}
							{
								isLoading || !data
									?
									<Grid item xs={6}>
										<CustomSkeleton variant={'rounded'} height={40} />
									</Grid>
									:
									<Grid item xs={6}>
										<FormControl>
											<StyledFormLabel>Website</StyledFormLabel>
											<StyledInput defaultValue={data.email} {...register('email')} />
										</FormControl>
									</Grid>
							}
						</Grid>

						<Grid container>
							<Grid item xs={5}>
								{
									isLoading || !data
										?
										<>
											<CustomSkeleton variant={'rounded'} height={30} width={150} sx={{ marginBottom: '15px' }} />
											<CustomSkeleton variant={'rounded'} height={30} width={150} />
										</>
										:
										<>
											<YellowCheckbox label={<p>Need Banner</p>} disabled />
											<HoursCheckbox label={<p><span>{data.timeLive}</span> Hours</p>} disabled checked />
										</>
								}
							</Grid>
							<Grid item xs={7}>
								<Box sx={{ display: 'flex', gap: '20px' }}>
									{
										isLoading || !data
											?
											<>
												<CustomSkeleton variant={'rounded'} height={45} width={140} />
												<CustomSkeleton variant={'rounded'} height={45} width={140} />
											</>
											:
											<>
												<Decline
													type={'submit'}
													onClick={() => setTypeRequest('decline')}
												>
													Decline
												</Decline>

												<Accept
													type={'submit'}
													onClick={() => setTypeRequest('accept')}
												>
													Accept
												</Accept>
											</>
									}
								</Box>
							</Grid>
						</Grid>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default AdminReview;