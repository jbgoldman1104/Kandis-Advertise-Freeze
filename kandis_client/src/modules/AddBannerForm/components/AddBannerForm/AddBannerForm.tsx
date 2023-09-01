import styles from './AddBannerForm.module.scss';
import { Add, ButtonsGroup, Cancel, FormDialog } from './styles';
import React, { useCallback, useEffect, useState } from 'react';
import DropArea from '../DropArea/DropArea';
import YellowCheckbox from '../../../../ui/YellowCheckbox/YellowCheckbox';
import ToolTip from '../../../../ui/ToolTip/ToolTip';
import DescriptionArea from '../DescriptionArea/DescriptionArea';
import FormInput from '../FormInput/FormInput';
import { ReactComponent as IcEmail } from '../../../../assets/icons/ic_email.svg';
import { ReactComponent as IcLink } from '../../../../assets/icons/ic_link.svg';
import SliderHours from '../SliderHours/SliderHours';
import { useMediaQuery } from '@mui/material';
import { getPrice } from '../../utils/getPrice';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/storeHooks';
import { setBannerActive } from '../../../../core/redux/slices/BannerSlice';
import { useForm, Controller } from 'react-hook-form';
import { IBanner } from '../../types';
import { urlRegex, emailRegex } from '../../utils/regex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBanner } from '../../api/addBanner';
import { setStatusPaymentFailed, setStatusPaymentCompleted } from '../../../../core/redux/slices/ModalSlice';
import StatusModal from '../StatusModal/StatusModal';
import { resizeFile } from '../../utils/resizeFile';
import KandisTransaction from '../../../../core/contract/KandisTransaction';
import { REACT_APP_MAIN_CONTRACT } from '../../../../utils/consts';


const AddBannerForm = () => {
	const queryClient = useQueryClient();
	const [fullPrice, setFullPrice] = useState<number>(100);
	const isMobile = useMediaQuery('(min-width: 768px)');
	const { isActive } = useAppSelector(state => state.BannerSlice);
	const { statusPaymentFailed, statusPaymentCompleted } = useAppSelector(state => state.ModalSlice);
	const dispatch = useAppDispatch();
	const {
		handleSubmit,
		control,
		setValue,
		watch,
		reset
	} = useForm<IBanner>();
	const { mutateAsync } = useMutation(
		['create banner'],
		(data: IBanner) => addBanner(data),
		{
			onSuccess: async () => {
				closeForm();
				dispatch(setStatusPaymentCompleted(true));
				await queryClient.invalidateQueries({ queryKey: ['get banners'] });
				reset();
			},
			onError: () => {
				closeForm();
				dispatch(setStatusPaymentFailed(true));
				reset();
			}

		}
	);
	const mainContractAddress: string = REACT_APP_MAIN_CONTRACT;
	const kandisTransaction = new KandisTransaction(mainContractAddress);
	const hoursPrice = getPrice(Number(watch('timeLive', 12)));
	const bannerChecked = watch('bannerChecked', false) ? 50 : 0;
	const bannerImage = watch('image') ? URL.createObjectURL(watch('image')[0]) : false;

	const closeForm = () => {
		dispatch(setBannerActive(false));
	};

	useEffect(() => {
		setFullPrice(hoursPrice + bannerChecked);
	}, [hoursPrice, bannerChecked]);

	const createBanner = async (data: IBanner) => {
		try {
			const message = 'Kandis Transaction';
			//await kandisTransaction.sendTransaction(message);

			const formData: any = new FormData();
			const image = data.image[0];
			//const image = await resizeFile(imageFile);
			formData.append('image', image);
			formData.append('description', data.description);
			formData.append('websiteLink', data.websiteLink);
			formData.append('email', data.email);
			formData.append('timeLive', data.timeLive);

			await mutateAsync(formData);
		} catch (err: any) {
			closeForm();
			dispatch(setStatusPaymentFailed(true));
			reset();
			throw new Error(err);
		}
	};


	return (
		<>
			<FormDialog
				scroll={'body'}
				open={isActive}
				onClose={closeForm}
				fullScreen={!isMobile}
			>
				<div className={styles.addBannerForm}>
					<div className={styles.header}>
						<p>Add Banner</p>
					</div>

					<div className={styles.body}>
						<form onSubmit={handleSubmit(createBanner)}>
							{
								bannerImage ?
									<div className={styles.bannerPreview}>
										<img src={bannerImage} alt='banner-preview' />
									</div>
									:
									<Controller
										name={'image'}
										rules={{ required: 'Required field' }}
										control={control}
										render={({ formState: { errors }, fieldState }) => (
											<DropArea
												multiple={false}
												onAcceptedFiles={(acceptedFiles) => {
													setValue('image', acceptedFiles as unknown as FileList, {
														shouldValidate: true
													});
												}}
												errors={errors?.image}
												errorMessage={fieldState.error?.message}
											/>
										)}
									/>
							}

							<Controller
								name='bannerChecked'
								control={control}
								defaultValue={false}
								render={({ field: { value, onChange } }) => {
									return <YellowCheckbox
										checked={value}
										onChange={onChange}
										className={styles.label_30}
										label={
											<p>
												I don't have a banner
												<ToolTip title={
													'If you do not have a banner, our designers can make a banner for your promotion for an additional fee, the hoursPrice of this service is $ 50'}
												/>
											</p>
										}
									/>;
								}}
							/>


							<Controller
								name='description'
								control={control}
								defaultValue={''}
								rules={{ required: 'Required field', maxLength: 300 }}
								render={({ field: { value, onChange, onBlur }, fieldState, formState: { errors } }) => {
									return <DescriptionArea
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										errors={errors}
										errorMessage={fieldState.error?.message}
									/>;
								}}
							/>


							<Controller
								name='websiteLink'
								control={control}
								defaultValue=''
								rules={{
									required: 'Required field',
									pattern: {
										value: urlRegex,
										message: 'Enter in the format https://www.example.com'
									}
								}}
								render={({ field, formState: { errors } }) => {
									return <FormInput
										label={'Link...'}
										icon={<IcLink />}
										className={styles.label_30}
										errors={errors?.websiteLink}
										errorMessage={errors && errors.websiteLink ? errors.websiteLink.message : false}
										{...field}
									/>;
								}}
							/>

							<Controller
								name='email'
								control={control}
								defaultValue=''
								rules={{
									required: 'Required field',
									pattern: {
										value: emailRegex,
										message: 'Enter in the format email@gmail.com'
									}
								}}
								render={({ field, formState: { errors } }) => {
									return <FormInput
										label={'Email...'}
										icon={<IcEmail />}
										className={styles.label_30}
										errors={errors?.email}
										errorMessage={errors && errors.email ? errors.email.message : false}
										{...field}
									/>;
								}}
							/>


							<div className={styles.selectHours}>
								<p>
									Select the number of hours
									<ToolTip
										title={
											'Choose the number of hours your banner will be displayed, each 12 hours adds $50 to the cost'
										}
									/>
								</p>

								<Controller
									name='timeLive'
									control={control}
									defaultValue={12}
									render={({ field: { value, onChange, ref } }) => {
										return <SliderHours value={value} onChange={onChange} ref={ref} />;
									}}

								/>
							</div>

							<ButtonsGroup>
								<Cancel onClick={closeForm}>Cancel</Cancel>
								<Add type={'submit'}>Add for ${fullPrice}</Add>
							</ButtonsGroup>
						</form>
					</div>
				</div>
			</FormDialog>

			<StatusModal
				type={'failed'}
				onClose={() => dispatch(setStatusPaymentFailed(false))}
				open={statusPaymentFailed}
			/>

			<StatusModal
				type={'completed'}
				onClose={() => dispatch(setStatusPaymentCompleted(false))}
				open={statusPaymentCompleted}
			/>
		</>
	);
};

export default AddBannerForm;